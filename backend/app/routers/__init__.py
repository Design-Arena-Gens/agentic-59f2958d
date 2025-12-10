from fastapi import APIRouter

from . import forecasts, assets, alerts, settlements


api_router = APIRouter()
api_router.include_router(forecasts.router, prefix="/forecasts", tags=["forecasts"])
api_router.include_router(assets.router, prefix="/assets", tags=["assets"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(settlements.router, prefix="/settlements", tags=["settlements"])

