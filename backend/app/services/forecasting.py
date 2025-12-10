from __future__ import annotations

from datetime import datetime, timezone
from typing import List

from ..schemas.forecasts import ForecastPoint, ForecastSummary
from .datastore import InMemoryDatastore


class ForecastingService:
    """Orchestrates forecast retrieval and background updates."""

    def __init__(self, datastore: InMemoryDatastore | None = None):
        self.datastore = datastore or InMemoryDatastore()

    def get_summary(self) -> ForecastSummary:
        return self.datastore.snapshot_summary()

    def get_series(self) -> List[ForecastPoint]:
        return self.datastore.snapshot_forecasts()

    def generate_next(self):
        point, alert = self.datastore.generate_forecast()
        return point, alert

    def refresh_assets(self):
        return self.datastore.update_assets()

    def snapshot_alerts(self):
        return self.datastore.snapshot_alerts()

    def seed_alert(self, message: str, severity: str = "medium"):
        return self.datastore.record_alert(message, severity)

    def synthesize_hash(self) -> str:
        summary = self.get_summary()
        payload = (
            f"{summary.region}:{summary.model_version}:{summary.updated_at.isoformat()}"
        )
        return payload.encode().hex()

    def heartbeat(self) -> dict:
        point, alert = self.generate_next()
        self.refresh_assets()
        return {
            "timestamp": datetime.now(tz=timezone.utc).isoformat(),
            "last_forecast": point.model_dump(),
            "alert": alert.model_dump() if alert else None,
        }
