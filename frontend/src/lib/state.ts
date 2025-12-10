import { create } from "zustand";
import dayjs from "dayjs";
import type { ForecastPoint, ForecastSummary, GridAlert } from "../types";

interface AnalyticsState {
  summary: ForecastSummary | null;
  forecasts: ForecastPoint[];
  alerts: GridAlert[];
  setSummary: (summary: ForecastSummary) => void;
  addForecastPoint: (point: ForecastPoint) => void;
  setForecastSeries: (series: ForecastPoint[]) => void;
  prependAlert: (alert: GridAlert) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  summary: null,
  forecasts: [],
  alerts: [],
  setSummary: (summary) => set({ summary }),
  addForecastPoint: (point) =>
    set((state) => ({
      forecasts: [...state.forecasts.slice(-179), point],
    })),
  setForecastSeries: (series) =>
    set(() => ({
      forecasts: series
        .slice()
        .sort((a, b) => dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf()),
    })),
  prependAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts].slice(0, 25),
    })),
}));

