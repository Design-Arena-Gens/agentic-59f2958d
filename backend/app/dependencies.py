from functools import lru_cache

from .services.forecasting import ForecastingService


@lru_cache
def get_forecasting_service() -> ForecastingService:
    return ForecastingService()

