from pydantic import BaseModel, Field


class AssetPerformance(BaseModel):
    asset_id: str
    asset_type: str
    location: str
    latest_output_kw: float = Field(..., ge=0)
    forecast_output_kw: float = Field(..., ge=0)
    delta_percent: float


class AssetPerformanceResponse(BaseModel):
    assets: list[AssetPerformance]

