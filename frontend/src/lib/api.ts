import axios from "axios";
import type {
  AssetPerformance,
  ForecastPoint,
  ForecastSummary,
  GridAlert,
} from "../types";

const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
    "http://localhost:8000",
  timeout: 10_000,
});

export async function fetchForecastSummary(): Promise<ForecastSummary> {
  const { data } = await apiClient.get<{
    region: string;
    model_version: string;
    updated_at: string;
    horizon_minutes: number;
    accuracy: number;
    total_assets: number;
    renewable_share: number;
    discrepancies: number;
  }>("/api/v1/forecasts/summary");
  return {
    region: data.region,
    modelVersion: data.model_version,
    updatedAt: data.updated_at,
    horizonMinutes: data.horizon_minutes,
    accuracy: data.accuracy,
    totalAssets: data.total_assets,
    renewableShare: data.renewable_share,
    discrepancies: data.discrepancies,
  };
}

export async function fetchForecastSeries(): Promise<ForecastPoint[]> {
  const { data } = await apiClient.get<{
    points: {
      timestamp: string;
      actual_load_mw: number;
      forecast_load_mw: number;
      upper_quantile_mw: number;
      lower_quantile_mw: number;
    }[];
  }>(
    "/api/v1/forecasts/latest",
  );
  return data.points.map((point) => ({
    timestamp: point.timestamp,
    actualLoadMw: point.actual_load_mw,
    forecastLoadMw: point.forecast_load_mw,
    upperQuantileMw: point.upper_quantile_mw,
    lowerQuantileMw: point.lower_quantile_mw,
  }));
}

export async function fetchAssetPerformance(): Promise<AssetPerformance[]> {
  const { data } = await apiClient.get<{
    assets: {
      asset_id: string;
      asset_type: string;
      location: string;
      latest_output_kw: number;
      forecast_output_kw: number;
      delta_percent: number;
    }[];
  }>(
    "/api/v1/assets/performance",
  );
  return data.assets.map((asset) => ({
    assetId: asset.asset_id,
    assetType: asset.asset_type,
    location: asset.location,
    latestOutputKw: asset.latest_output_kw,
    forecastOutputKw: asset.forecast_output_kw,
    deltaPercent: asset.delta_percent,
  }));
}

export async function fetchAlerts(): Promise<GridAlert[]> {
  const { data } = await apiClient.get<{
    alerts: {
      id: string;
      created_at: string;
      severity: GridAlert["severity"];
      message: string;
      region: string;
    }[];
  }>(
    "/api/v1/alerts/recent",
  );
  return data.alerts.map((alert) => ({
    id: alert.id,
    createdAt: alert.created_at,
    severity: alert.severity,
    message: alert.message,
    region: alert.region,
  }));
}

export const websocketUrl =
  process.env.NEXT_PUBLIC_WS_URL?.replace(/^http/, "ws") ||
  "ws://localhost:8000/ws/forecasts";
