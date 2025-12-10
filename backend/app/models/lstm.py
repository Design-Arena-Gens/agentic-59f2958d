from __future__ import annotations

from dataclasses import dataclass
from math import exp
from random import Random
from typing import Iterable, List


@dataclass
class LSTMConfig:
    hidden_size: int = 32
    seed: int = 42
    dropout: float = 0.1


class LightweightLSTM:
    """Lightweight pseudo-LSTM forecaster for deterministic demo predictions."""

    def __init__(self, config: LSTMConfig | None = None):
        self.config = config or LSTMConfig()
        self._rng = Random(self.config.seed)
        self.hidden_state = [0.0] * self.config.hidden_size

    def reset(self) -> None:
        self.hidden_state = [0.0] * self.config.hidden_size

    def _sigmoid(self, x: float) -> float:
        return 1 / (1 + exp(-x))

    def _tanh(self, x: float) -> float:
        return (exp(x) - exp(-x)) / (exp(x) + exp(-x))

    def _step(self, value: float) -> float:
        gate = self._sigmoid(value / 100.0)
        update = self._tanh(value / 50.0)
        for idx in range(self.config.hidden_size):
            decay = 0.85 + self._rng.random() * 0.05
            self.hidden_state[idx] = (
                self.hidden_state[idx] * decay + gate * update * (idx + 1) / 100.0
            )
        return sum(self.hidden_state) / self.config.hidden_size

    def forecast(
        self,
        series: Iterable[float],
        horizon: int,
        base: float,
    ) -> List[float]:
        self.reset()
        history = list(series)
        for value in history[-self.config.hidden_size :]:
            self._step(value)

        forecasts: List[float] = []
        latest = history[-1] if history else base
        for step in range(1, horizon + 1):
            perturbation = self._step(latest)
            trend = 0.6 * perturbation * (1 + step / horizon)
            cycle = 0.4 * self._tanh(self._rng.uniform(-1, 1))
            predicted = max(base * 0.5, latest + trend + cycle)
            forecasts.append(predicted)
            latest = predicted
        return forecasts

