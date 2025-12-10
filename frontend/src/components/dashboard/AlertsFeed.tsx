import dayjs from "dayjs";
import { AlertTriangle } from "lucide-react";
import { useAnalyticsStore } from "../../lib/state";

const severityColors: Record<string, string> = {
  low: "text-emerald-300",
  medium: "text-amber-300",
  high: "text-orange-400",
  critical: "text-rose-500",
};

export function AlertsFeed() {
  const alerts = useAnalyticsStore((state) => state.alerts);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-semibold text-white">Grid Alerts</h3>
      </div>
      <div className="mt-4 space-y-3">
        {alerts.length === 0 && (
          <p className="text-sm text-slate-400">
            No active alerts. Forecast deviation within acceptable thresholds.
          </p>
        )}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-2xl border border-white/5 bg-white/5 p-4"
          >
            <p
              className={`text-xs font-semibold uppercase tracking-wide ${
                severityColors[alert.severity]
              }`}
            >
              {alert.severity}
            </p>
            <p className="mt-2 text-sm text-white">{alert.message}</p>
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>{alert.region}</span>
              <span>{dayjs(alert.createdAt).format("HH:mm:ss")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

