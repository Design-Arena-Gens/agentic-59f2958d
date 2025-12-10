from fastapi import APIRouter, Depends

from ..dependencies import get_forecasting_service
from ..schemas.settlements import NotarizeRequest, SettlementStatus
from ..services.blockchain import BlockchainService
from ..services.forecasting import ForecastingService

router = APIRouter()
blockchain_service = BlockchainService()


@router.post("/notarize", response_model=SettlementStatus)
def notarize_forecast(
    request: NotarizeRequest,
    service: ForecastingService = Depends(get_forecasting_service),
):
    if not request.forecast_hash:
        request.forecast_hash = service.synthesize_hash()
    return blockchain_service.notarize(request)


@router.get("/{tx_hash}", response_model=SettlementStatus)
def settlement_status(tx_hash: str):
    return blockchain_service.get_status(tx_hash)

