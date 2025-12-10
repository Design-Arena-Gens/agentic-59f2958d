export interface ForecastPoint {
  timestamp: string;
  actualLoadMw: number;
  forecastLoadMw: number;
  upperQuantileMw: number;
  lowerQuantileMw: number;
}

export interface ForecastSummary {
  region: string;
  modelVersion: string;
  updatedAt: string;
  horizonMinutes: number;
  accuracy: number;
  totalAssets: number;
  renewableShare: number;
  discrepancies: number;
}

export interface GridAlert {
  id: string;
  createdAt: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  region: string;
}

export interface AssetPerformance {
  assetId: string;
  assetType: string;
  location: string;
  latestOutputKw: number;
  forecastOutputKw: number;
  deltaPercent: number;
}

