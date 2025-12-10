from datetime import datetime
from pydantic import BaseModel


class Alert(BaseModel):
    id: str
    created_at: datetime
    severity: str
    message: str
    region: str


class AlertsResponse(BaseModel):
    alerts: list[Alert]

