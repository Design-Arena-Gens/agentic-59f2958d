import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchAssetPerformance } from "../../lib/api";
import type { AssetPerformance } from "../../types";

const headers = ["Asset", "Type", "Location", "Output (kW)", "Forecast (kW)", "Delta %"];

export function ForecastTable() {
  const [assets, setAssets] = useState<AssetPerformance[]>([]);

  useEffect(() => {
    fetchAssetPerformance()
      .then(setAssets)
      .catch((error) => console.error("Failed to load asset performance", error));
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-white">
          Asset Performance
        </h3>
        <p className="text-xs text-slate-400">
          Forecast drift across top DER assets, refreshed {dayjs().format("HH:mm")} UTC
        </p>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400">
              {headers.map((header) => (
                <th key={header} className="py-2 pr-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {assets.map((asset) => (
              <tr key={asset.assetId} className="hover:bg-slate-800/60">
                <td className="py-3 pr-4 font-mono text-xs">{asset.assetId}</td>
                <td className="py-3 pr-4">{asset.assetType}</td>
                <td className="py-3 pr-4">{asset.location}</td>
                <td className="py-3 pr-4">{asset.latestOutputKw.toLocaleString()}</td>
                <td className="py-3 pr-4">{asset.forecastOutputKw.toLocaleString()}</td>
                <td
                  className={`py-3 pr-4 font-semibold ${
                    asset.deltaPercent >= 5
                      ? "text-rose-400"
                      : asset.deltaPercent <= -5
                        ? "text-emerald-400"
                        : "text-slate-200"
                  }`}
                >
                  {asset.deltaPercent.toFixed(2)}%
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="py-8 text-center text-xs text-slate-400">
                  Loading asset performance...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

