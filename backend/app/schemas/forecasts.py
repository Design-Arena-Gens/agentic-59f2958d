from datetime import datetime
from typing import List
from pydantic import BaseModel, Field


class ForecastPoint(BaseModel):
    timestamp: datetime
    actual_load_mw: float = Field(..., ge=0)
    forecast_load_mw: float = Field(..., ge=0)
    upper_quantile_mw: float = Field(..., ge=0)
    lower_quantile_mw: float = Field(..., ge=0)


class ForecastSeriesResponse(BaseModel):
    points: List[ForecastPoint]


class ForecastSummary(BaseModel):
    region: str
    model_version: str
    updated_at: datetime
    horizon_minutes: int
    accuracy: float = Field(..., ge=0, le=100)
    total_assets: int = Field(..., ge=0)
    renewable_share: float = Field(..., ge=0, le=100)
    discrepancies: int = Field(..., ge=0)

