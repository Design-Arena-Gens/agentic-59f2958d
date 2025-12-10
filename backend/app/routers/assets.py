from fastapi import APIRouter, Depends

from ..dependencies import get_forecasting_service
from ..schemas.assets import AssetPerformanceResponse
from ..services.forecasting import ForecastingService

router = APIRouter()


@router.get("/performance", response_model=AssetPerformanceResponse)
def read_asset_performance(
    service: ForecastingService = Depends(get_forecasting_service),
):
    assets = service.refresh_assets()
    return AssetPerformanceResponse(assets=list(assets))

