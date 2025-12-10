from datetime import datetime
from pydantic import BaseModel


class NotarizeRequest(BaseModel):
    forecast_hash: str
    region: str
    horizon_minutes: int
    model_version: str


class SettlementStatus(BaseModel):
    tx_hash: str
    status: str
    block_number: int | None = None
    confirmed_at: datetime | None = None
    explorer_url: str | None = None

