from __future__ import annotations

from collections import deque
from datetime import datetime, timedelta, timezone
from random import Random
from typing import Deque, Iterable, List, Optional, Tuple

from ..models.lstm import LightweightLSTM
from ..schemas.assets import AssetPerformance
from ..schemas.alerts import Alert
from ..schemas.forecasts import ForecastPoint, ForecastSummary


class InMemoryDatastore:
    """Demonstration datastore backing the API with deterministic pseudo-data."""

    def __init__(self, region: str = "CAISO_SOUTH"):
        self.region = region
        self._rng = Random(1337)
        self._lstm = LightweightLSTM()
        self._forecast_series: Deque[ForecastPoint] = deque(maxlen=180)
        self._alerts: Deque[Alert] = deque(maxlen=50)
        self._assets: List[AssetPerformance] = []
        self._summary: ForecastSummary | None = None
        self._seed_initial_state()

    def _seed_initial_state(self) -> None:
        base = 2800.0
        timestamps = [
            datetime.now(tz=timezone.utc) - timedelta(minutes=5 * (180 - idx))
            for idx in range(180)
        ]
        history: List[float] = []
        for ts in timestamps:
            baseline = base + self._rng.uniform(-120, 120)
            history.append(baseline)
            self._forecast_series.append(
                ForecastPoint(
                    timestamp=ts,
                    actual_load_mw=baseline,
                    forecast_load_mw=baseline + self._rng.uniform(-30, 30),
                    upper_quantile_mw=baseline + self._rng.uniform(40, 60),
                    lower_quantile_mw=baseline - self._rng.uniform(40, 60),
                )
            )

        self._assets = [
            AssetPerformance(
                asset_id=f"ASSET-{idx:04d}",
                asset_type=self._rng.choice(["Solar", "Wind", "Battery", "Hydro"]),
                location=self._rng.choice(["Nevada", "Los Angeles", "San Diego", "Phoenix"]),
                latest_output_kw=round(self._rng.uniform(800, 1800), 2),
                forecast_output_kw=round(self._rng.uniform(800, 1800), 2),
                delta_percent=round(self._rng.uniform(-8, 8), 2),
            )
            for idx in range(12)
        ]

        self._summary = ForecastSummary(
            region=self.region,
            model_version="1.2.0",
            updated_at=datetime.now(tz=timezone.utc),
            horizon_minutes=60,
            accuracy=97.4,
            total_assets=18200,
            renewable_share=68.2,
            discrepancies=3,
        )

    def snapshot_forecasts(self) -> List[ForecastPoint]:
        return list(self._forecast_series)

    def snapshot_summary(self) -> ForecastSummary:
        if self._summary is None:
            raise RuntimeError("Summary not initialized")
        return self._summary

    def snapshot_assets(self) -> List[AssetPerformance]:
        return list(self._assets)

    def snapshot_alerts(self) -> List[Alert]:
        return list(self._alerts)

    def append_forecast(self, actual: float, forecast: float, timestamp: datetime) -> ForecastPoint:
        point = ForecastPoint(
            timestamp=timestamp,
            actual_load_mw=actual,
            forecast_load_mw=forecast,
            upper_quantile_mw=forecast * 1.05,
            lower_quantile_mw=forecast * 0.95,
        )
        self._forecast_series.append(point)
        return point

    def record_alert(self, message: str, severity: str = "medium") -> Alert:
        alert = Alert(
            id=f"alert-{len(self._alerts) + 1}",
            created_at=datetime.now(tz=timezone.utc),
            severity=severity,
            message=message,
            region=self.region,
        )
        self._alerts.appendleft(alert)
        return alert

    def generate_forecast(self) -> Tuple[ForecastPoint, Optional[Alert]]:
        history = [p.actual_load_mw for p in self._forecast_series]
        latest = history[-1] if history else 2800.0
        forecast_series = self._lstm.forecast(history, horizon=1, base=latest)[0]
        actual = latest + self._rng.uniform(-20, 20)
        timestamp = datetime.now(tz=timezone.utc)
        point = self.append_forecast(actual, forecast_series, timestamp)
        new_alert: Optional[Alert] = None
        if abs(actual - forecast_series) / max(actual, 1) > 0.05:
            new_alert = self.record_alert(
                message=f"{self.region}: deviation {abs(actual - forecast_series):.1f} MW",
                severity="high",
            )
        if self._summary:
            self._summary = ForecastSummary(
                **{
                    **self._summary.model_dump(),
                    "updated_at": timestamp,
                    "accuracy": max(92.0, 99.0 - abs(actual - forecast_series) / 5),
                    "discrepancies": len([a for a in self._alerts if a.severity in {"high", "critical"}]),
                }
            )
        return point, new_alert

    def update_assets(self) -> Iterable[AssetPerformance]:
        updated = []
        for asset in self._assets:
            drift = self._rng.uniform(-4, 4)
            latest = max(0.0, asset.latest_output_kw + drift)
            forecast = max(0.0, asset.forecast_output_kw + self._rng.uniform(-4, 4))
            delta = ((latest - forecast) / max(forecast, 1)) * 100
            new_asset = AssetPerformance(
                asset_id=asset.asset_id,
                asset_type=asset.asset_type,
                location=asset.location,
                latest_output_kw=round(latest, 2),
                forecast_output_kw=round(forecast, 2),
                delta_percent=round(delta, 2),
            )
            updated.append(new_asset)
        self._assets = updated
        return updated
