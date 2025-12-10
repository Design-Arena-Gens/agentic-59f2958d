/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAnalyticsStore } from "../../lib/state";
import { createForecastSocket } from "../../lib/socket";
import { fetchForecastSeries, fetchForecastSummary } from "../../lib/api";

const yFormatter = (val: number) => `${val.toFixed(1)} MW`;

export function RealtimeChart() {
  const forecasts = useAnalyticsStore((state) => state.forecasts);
  const setSeries = useAnalyticsStore((state) => state.setForecastSeries);
  const setSummary = useAnalyticsStore((state) => state.setSummary);
  const addPoint = useAnalyticsStore((state) => state.addForecastPoint);
  const prependAlert = useAnalyticsStore((state) => state.prependAlert);

  useEffect(() => {
    fetchForecastSummary().then(setSummary).catch(console.error);
    fetchForecastSeries().then(setSeries).catch(console.error);

    const socket = createForecastSocket((message) => {
      if (message.type === "forecast") {
        addPoint(message.payload);
      }
      if (message.type === "alert") {
        prependAlert(message.payload);
      }
    });

    return () => socket.close();
  }, [addPoint, prependAlert, setSeries, setSummary]);

  return (
    <div className="h-[360px] w-full rounded-3xl border border-white/10 bg-slate-900/60 p-4 md:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Real-time Grid Forecast
          </h3>
          <p className="text-xs text-slate-400">
            Streaming LSTM ensembles with p10/p90 confidence bounds
          </p>
        </div>
      </div>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer>
          <AreaChart data={forecasts}>
            <defs>
              <linearGradient id="forecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(value: string) => dayjs(value).format("HH:mm")}
              stroke="#94a3b8"
            />
            <YAxis stroke="#94a3b8" tickFormatter={yFormatter} />
            <Tooltip
              labelFormatter={(value) => dayjs(value).format("MMM D, HH:mm")}
              contentStyle={{
                background: "rgba(15,23,42,0.95)",
                borderRadius: 12,
                border: "1px solid rgba(59,130,246,0.3)",
              }}
              formatter={(value: number, name: any) => [yFormatter(value), name]}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="forecastLoadMw"
              stroke="#0ea5e9"
              fill="url(#forecast)"
              name="Forecast"
            />
            <Area
              type="monotone"
              dataKey="actualLoadMw"
              stroke="#22c55e"
              fill="url(#actual)"
              name="Observed"
            />
            <Area
              type="monotone"
              dataKey="upperQuantileMw"
              stroke="#38bdf8"
              fillOpacity={0}
              strokeDasharray="4 6"
              name="P90"
            />
            <Area
              type="monotone"
              dataKey="lowerQuantileMw"
              stroke="#38bdf8"
              fillOpacity={0}
              strokeDasharray="4 6"
              name="P10"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

