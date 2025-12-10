from __future__ import annotations

import asyncio
import json
import contextlib
from contextlib import asynccontextmanager
from typing import Set

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .dependencies import get_forecasting_service
from .routers import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    forecasting_service = get_forecasting_service()
    app.state.broadcast_task = asyncio.create_task(
        broadcast_loop(
            interval=settings.websocket_broadcast_interval,
            forecasting_service=forecasting_service,
        )
    )
    try:
        yield
    finally:
        app.state.broadcast_task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await app.state.broadcast_task


app = FastAPI(
    title="DEForecast Backend",
    description=(
        "Real-time decentralized energy forecasting service combining AI inference, "
        "Spark streaming, and blockchain notarization."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=get_settings().api_v1_prefix)

connections: Set[WebSocket] = set()


@app.get("/health")
async def health():
    return {"status": "ok"}


async def broadcast_loop(interval: float, forecasting_service):
    while True:
        point, alert = forecasting_service.generate_next()
        payload = {
            "type": "forecast",
            "payload": {
                "timestamp": point.timestamp.isoformat(),
                "actualLoadMw": point.actual_load_mw,
                "forecastLoadMw": point.forecast_load_mw,
                "upperQuantileMw": point.upper_quantile_mw,
                "lowerQuantileMw": point.lower_quantile_mw,
            },
        }
        await broadcast(payload)
        if alert:
            await broadcast(
                {
                    "type": "alert",
                    "payload": {
                        "id": alert.id,
                        "createdAt": alert.created_at.isoformat(),
                        "severity": alert.severity,
                        "message": alert.message,
                        "region": alert.region,
                    },
                }
            )
        await asyncio.sleep(interval)


async def broadcast(message: dict):
    data = json.dumps(message)
    to_remove = []
    for connection in connections:
        try:
            await connection.send_text(data)
        except RuntimeError:
            to_remove.append(connection)
    for connection in to_remove:
        connections.discard(connection)


@app.websocket("/ws/forecasts")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.add(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        connections.discard(websocket)
