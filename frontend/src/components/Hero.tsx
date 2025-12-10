"use client";

import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, LineChart } from "lucide-react";

const highlights = [
  {
    title: "Real-time Grid Insights",
    description:
      "Stream data from edge devices via Apache Spark to anticipate load imbalance minutes ahead.",
    icon: Zap,
  },
  {
    title: "Federated Trust",
    description:
      "Immutable blockchain ledger for forecasts, deviations, and incentive settlements.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Driven Forecasting",
    description:
      "Explainable LSTM ensembles tuned on weather, DER, and wholesale market features.",
    icon: LineChart,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-cyan-500/10 to-transparent blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 py-24 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-xl space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            Decentralized Energy Forecasting Platform
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Predict demand. Incentivize supply. Stabilize decentralized grids.
            </h1>
            <p className="text-lg text-slate-300">
              DEForecast fuses IoT telemetry, blockchain incentives, and
              AI-powered forecasts to keep decentralized energy networks in
              balance—eliminating downtime while accelerating renewable
              adoption.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-400"
            >
              Launch Analytics
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              Explore Architecture
            </a>
          </div>
        </div>
        <div className="grid flex-1 gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/60"
            >
              <item.icon className="mb-3 h-8 w-8 text-sky-300" />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

