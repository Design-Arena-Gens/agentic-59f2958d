from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import sha256
from random import Random

from ..schemas.settlements import NotarizeRequest, SettlementStatus


@dataclass(slots=True)
class BlockchainConfig:
    explorer_base_url: str = "https://etherscan.io/tx"


class BlockchainService:
    """Mock blockchain integration for notarizing forecast hashes."""

    def __init__(self, config: BlockchainConfig | None = None):
        self.config = config or BlockchainConfig()
        self._rng = Random(2024)

    def notarize(self, request: NotarizeRequest) -> SettlementStatus:
        digest = sha256(
            f"{request.forecast_hash}:{request.region}:{request.model_version}".encode()
        ).hexdigest()
        tx_hash = f"0x{digest[:64]}"
        block = self._rng.randint(19_000_000, 20_000_000)
        confirmed_at = datetime.now(tz=timezone.utc)
        return SettlementStatus(
            tx_hash=tx_hash,
            status="confirmed",
            block_number=block,
            confirmed_at=confirmed_at,
            explorer_url=f"{self.config.explorer_base_url}/{tx_hash}",
        )

    def get_status(self, tx_hash: str) -> SettlementStatus:
        return SettlementStatus(
            tx_hash=tx_hash,
            status="confirmed",
            block_number=19_999_998,
            confirmed_at=datetime.now(tz=timezone.utc),
            explorer_url=f"{self.config.explorer_base_url}/{tx_hash}",
        )

