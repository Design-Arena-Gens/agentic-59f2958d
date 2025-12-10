import { Database, Cpu, Shield, Workflow } from "lucide-react";

const features = [
  {
    name: "Streaming ingestion",
    description:
      "Apache Spark Structured Streaming normalizes edge telemetry with millisecond latency, persisting into a scalable lakehouse.",
    icon: Workflow,
  },
  {
    name: "Hybrid storage fabric",
    description:
      "Time-series data in TimescaleDB, asset registries in PostgreSQL, and high-velocity events in MongoDB for elastic querying.",
    icon: Database,
  },
  {
    name: "Predictive intelligence",
    description:
      "Hierarchical LSTM ensembles with attention deliver 5-60 minute forecasts and uncertainty intervals per feeder.",
    icon: Cpu,
  },
  {
    name: "Provable trust",
    description:
      "Ethereum smart contracts notarize model outputs and incentive settlements for transparent and auditable operations.",
    icon: Shield,
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Built for resilient decentralized energy markets
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Modular microservices, predictive AI, and verifiable blockchain rails
          help DSOs, microgrids, and VPPs operate with confidence.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 transition hover:-translate-y-1 hover:border-sky-400/60"
          >
            <feature.icon className="h-8 w-8 text-sky-300" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              {feature.name}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

