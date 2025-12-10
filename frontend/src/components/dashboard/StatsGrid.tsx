import dayjs from "dayjs";
import type { ForecastSummary } from "@/types";
import { useAnalyticsStore } from "@/lib/state";

const statsMeta = [
  {
    label: "Forecast Accuracy",
    suffix: "%",
    accent: "text-emerald-400",
    accessor: (summary: ForecastSummary) => summary.accuracy,
    fractionDigits: 2,
  },
  {
    label: "Horizon",
    suffix: " min",
    accent: "text-sky-300",
    accessor: (summary: ForecastSummary) => summary.horizonMinutes,
    fractionDigits: 0,
  },
  {
    label: "Assets",
    suffix: "",
    accent: "text-indigo-300",
    accessor: (summary: ForecastSummary) => summary.totalAssets,
    fractionDigits: 0,
  },
  {
    label: "Renewable Share",
    suffix: "%",
    accent: "text-amber-300",
    accessor: (summary: ForecastSummary) => summary.renewableShare,
    fractionDigits: 1,
  },
  {
    label: "Active Deviations",
    suffix: "",
    accent: "text-rose-400",
    accessor: (summary: ForecastSummary) => summary.discrepancies,
    fractionDigits: 0,
  },
];

export function StatsGrid() {
  const summary = useAnalyticsStore((state) => state.summary);

  if (!summary) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-3xl border border-white/10 bg-slate-900/60 p-6"
          >
            <div className="h-4 w-24 rounded-full bg-slate-700/70" />
            <div className="mt-4 h-8 w-32 rounded-full bg-slate-700/70" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {statsMeta.map((meta) => (
        <div
          key={meta.label}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
        >
          <p className="text-sm text-slate-400">{meta.label}</p>
          <p className={`mt-3 text-3xl font-semibold ${meta.accent}`}>
            {meta
              .accessor(summary)
              .toLocaleString(undefined, {
                maximumFractionDigits: meta.fractionDigits,
              })}
            {meta.suffix}
          </p>
        </div>
      ))}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <p className="text-sm text-slate-400">Model Version</p>
        <p className="mt-3 text-lg font-semibold text-sky-300">
          {summary.modelVersion}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Updated {dayjs(summary.updatedAt).format("MMM D, HH:mm")} UTC
        </p>
      </div>
    </div>
  );
}
