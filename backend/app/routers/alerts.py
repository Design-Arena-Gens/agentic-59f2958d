from fastapi import APIRouter, Depends

from ..dependencies import get_forecasting_service
from ..schemas.alerts import AlertsResponse
from ..services.forecasting import ForecastingService

router = APIRouter()


@router.get("/recent", response_model=AlertsResponse)
def read_recent_alerts(
    service: ForecastingService = Depends(get_forecasting_service),
):
    alerts = service.snapshot_alerts()
    return AlertsResponse(alerts=alerts)

