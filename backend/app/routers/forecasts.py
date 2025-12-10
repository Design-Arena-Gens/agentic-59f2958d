from fastapi import APIRouter, Depends

from ..config import get_settings
from ..dependencies import get_forecasting_service
from ..schemas.forecasts import ForecastSeriesResponse, ForecastSummary
from ..services.forecasting import ForecastingService

router = APIRouter()


@router.get("/summary", response_model=ForecastSummary)
def read_summary(
    service: ForecastingService = Depends(get_forecasting_service),
    settings=Depends(get_settings),
):
    summary = service.get_summary()
    return summary.model_copy(update={"region": settings.forecast_region})


@router.get("/latest", response_model=ForecastSeriesResponse)
def read_latest(
    service: ForecastingService = Depends(get_forecasting_service),
):
    return ForecastSeriesResponse(points=service.get_series())
