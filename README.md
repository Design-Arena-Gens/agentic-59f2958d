# Decentralized Energy Forecasting Platform

Production-ready blueprint for DEForecast, a decentralized energy forecasting, streaming, and settlement stack that fuses LSTM ensembles, Spark Streaming, FastAPI services, and blockchain notarization with a React/Tailwind analytics experience.

## System Overview

- **Frontend** – Next.js (App Router) + Tailwind CSS dashboard featuring real-time charts, wallet connectivity (ethers.js), and operational analytics.
- **Backend** – FastAPI microservice emitting REST + WebSocket APIs, deterministic LSTM-inspired inference, and blockchain notarization endpoints.
- **Streaming** – PySpark Structured Streaming job that enriches DER telemetry with windowed aggregations ready for feature stores.
- **Blockchain** – Solidity smart contract + Hardhat environment managing forecast notarization and settlement events.
- **Docs & Ops** – Architecture guide (`docs/architecture.md`), Dockerfiles, and Kubernetes manifests (see `k8s/`) to streamline deployment pipelines.

## Project Layout

```
├── frontend/                 # Next.js + Tailwind analytics experience
├── backend/                  # FastAPI inference + settlement API
├── streaming/                # Spark Structured Streaming job
├── blockchain/               # Ethereum smart contracts + Hardhat config
├── docs/architecture.md      # Architecture, data flows, deployment design
├── docker-compose.yml        # (Generated below) Local orchestration template
└── k8s/                      # Kubernetes deployment manifests
```

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# http://localhost:8000/docs
```

### Streaming (Spark)
Requires Kafka and Spark environment; leverage Docker Compose or `spark-submit` to run `streaming/main.py`.

### Blockchain (Hardhat)
```bash
cd blockchain
npm install
npx hardhat node       # local dev chain
npx hardhat compile    # build contracts
```

## Docker & Kubernetes

- `frontend/Dockerfile`, `backend/Dockerfile`, `streaming/Dockerfile`, `blockchain/Dockerfile` for containerizing each service.
- `docker-compose.yml` (provided) spawns frontend, backend, MongoDB, Kafka/ZooKeeper, Spark, and Hardhat testnet.
- `k8s/` contains manifests for API, frontend, Kafka, Spark operator, and supporting config to run on Kubernetes (with ingress + HPA stubs).

## Testing

- Frontend: `npm run lint` & `npm run test` (configure Jest/Playwright as needed).
- Backend: `pytest backend/tests`.
- Smart Contracts: `npx hardhat test`.

## Deployment Pipeline Highlights

1. GitHub Actions build each service, run unit tests, and bundle Docker artifacts.
2. Publish images to container registry with immutable tags.
3. Deploy FastAPI + streaming workloads via Helm or raw manifests.
4. Deploy Next.js frontend to Vercel (production URL `https://agentic-59f2958d.vercel.app`).
5. Execute Hardhat deploy script targeting Ethereum-compatible network (Hyperledger Besu, Polygon, etc.).

For in-depth diagrams, data flow descriptions, and microservice responsibilities see `docs/architecture.md`.
