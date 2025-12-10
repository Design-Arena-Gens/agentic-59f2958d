"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RealtimeChart } from "@/components/dashboard/RealtimeChart";
import { WalletConnect } from "@/components/dashboard/WalletConnect";
import { ForecastTable } from "@/components/dashboard/ForecastTable";
import { AlertsFeed } from "@/components/dashboard/AlertsFeed";
import { MapCard } from "@/components/dashboard/MapCard";
import { ModelStatus } from "@/components/dashboard/ModelStatus";
import { useEffect } from "react";
import { fetchAlerts } from "@/lib/api";
import { useAnalyticsStore } from "@/lib/state";

export default function DashboardPage() {
  const setAlerts = useAnalyticsStore((state) => state.prependAlert);
  const alerts = useAnalyticsStore((state) => state.alerts);

  useEffect(() => {
    if (alerts.length === 0) {
      fetchAlerts()
        .then((data) => {
          for (let i = data.length - 1; i >= 0; i -= 1) {
            setAlerts(data[i]);
          }
        })
        .catch((error) => console.error("Failed to seed alerts", error));
    }
  }, [alerts.length, setAlerts]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-white">
            Grid Operations Control Center
          </h1>
          <p className="text-sm text-slate-400">
            Streaming forecasts, on-chain settlements, and DER performance in a unified console.
          </p>
        </div>
        <StatsGrid />
        <RealtimeChart />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ForecastTable />
          </div>
          <div className="space-y-6">
            <WalletConnect />
            <ModelStatus />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MapCard />
          </div>
          <AlertsFeed />
        </div>
      </main>
      <Footer />
    </div>
  );
}

