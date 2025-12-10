const metrics = [
  { label: "Forecast Accuracy", value: "97.4%", sublabel: "Last 30 days" },
  { label: "Assets Connected", value: "18,200", sublabel: "DER endpoints" },
  { label: "Settlement Time", value: "4.2m", sublabel: "On-chain finality" },
  { label: "CO₂ Avoided", value: "14.8kt", sublabel: "Annualized impact" },
];

export function MetricsBar() {
  return (
    <section className="border-y border-white/10 bg-slate-950/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl bg-white/5 p-6">
            <p className="text-sm font-medium text-slate-300">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">
              {metric.value}
            </p>
            <p className="text-xs text-slate-400">{metric.sublabel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

