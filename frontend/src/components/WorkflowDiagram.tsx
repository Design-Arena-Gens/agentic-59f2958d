const workflow = [
  {
    title: "Edge Ingestion",
    description:
      "DERs and grid sensors publish telemetry to MQTT/Kafka brokers.",
  },
  {
    title: "Spark Streaming",
    description:
      "Streaming jobs enrich and aggregate payloads, emitting structured events.",
  },
  {
    title: "Model Serving",
    description:
      "FastAPI orchestrates GPU-backed LSTM inference and anomaly scoring.",
  },
  {
    title: "Blockchain Settlement",
    description:
      "Predictions and incentives notarized on Ethereum for transparent settlement.",
  },
  {
    title: "Analytics UX",
    description:
      "React dashboard visualizes forecasts, deviations, and contract performance.",
  },
];

export function WorkflowDiagram() {
  return (
    <section id="architecture" className="bg-slate-950/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            End-to-end decentralized operations
          </h2>
          <p className="text-lg text-slate-300">
            Purpose-built microservices ensure reliable forecasts, trustworthy
            settlements, and real-time situational awareness.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-5">
          {workflow.map((step, idx) => (
            <div
              key={step.title}
              className="group relative rounded-3xl border border-white/10 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-sky-400/60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/50 bg-sky-500/10 text-sm font-semibold text-sky-200">
                {idx + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

