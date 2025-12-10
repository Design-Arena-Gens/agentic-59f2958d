from functools import lru_cache
from pydantic import Field, AnyUrl
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "DEForecast Backend"
    environment: str = Field("development")
    api_v1_prefix: str = "/api/v1"
    mongodb_uri: AnyUrl | None = None
    timescale_dsn: str | None = None
    redis_url: AnyUrl | None = None
    ethereum_rpc_url: AnyUrl | None = None
    settlement_contract_address: str | None = None
    websocket_broadcast_interval: float = Field(5.0)
    forecast_region: str = Field("CAISO_SOUTH")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[call-arg]
