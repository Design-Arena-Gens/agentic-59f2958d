import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BrainCircuit, RefreshCw } from "lucide-react";
import { useAnalyticsStore } from "../../lib/state";

dayjs.extend(relativeTime);

export function ModelStatus() {
  const summary = useAnalyticsStore((state) => state.summary);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-emerald-500/20 p-2">
          <BrainCircuit className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Model Lifecycle</h3>
          <p className="text-xs text-slate-400">
            Canary, production, and drift metrics across regions.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-sm text-slate-300">
        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Production
            </p>
            <p className="text-white">LSTM Ensemble v{summary?.modelVersion ?? "1.0.0"}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <RefreshCw className="h-4 w-4" />
            {summary
              ? dayjs(summary.updatedAt).fromNow()
              : "Updating..."}
          </div>
        </div>
        <ul className="space-y-2 text-xs">
          <li className="flex justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-emerald-100">
            <span>Drift Monitor</span>
            <span>Stable (σ = 0.87)</span>
          </li>
          <li className="flex justify-between rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-sky-100">
            <span>Retrain Queue</span>
            <span>Scheduled @ 02:00 UTC</span>
          </li>
          <li className="flex justify-between rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-amber-100">
            <span>Canary Region</span>
            <span>P95 Error 2.3%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
