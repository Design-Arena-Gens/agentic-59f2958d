"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ShieldCheck } from "lucide-react";

type EthereumProvider = ethers.Eip1193Provider & {
  request?: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [chain, setChain] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(() =>
    typeof window !== "undefined" && !window.ethereum
      ? "MetaMask not detected. Install to participate in settlements."
      : null,
  );

  const provider: EthereumProvider | undefined =
    typeof window !== "undefined" ? window.ethereum : undefined;

  useEffect(() => {
    if (!provider) {
      return;
    }

    provider
      .request?.({ method: "eth_accounts" })
      .then((accounts) => {
        if (Array.isArray(accounts) && accounts.length > 0) {
          setAccount(ethers.getAddress(accounts[0]));
          setError(null);
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));

    const handleAccountsChanged: (...args: unknown[]) => void = (...args) => {
      const accounts = Array.isArray(args[0]) ? (args[0] as string[]) : [];
      if (accounts.length === 0) {
        setAccount(null);
        return;
      }
      setAccount(ethers.getAddress(accounts[0]));
      setError(null);
    };

    const handleChainChanged: (...args: unknown[]) => void = (...args) => {
      const chainId = typeof args[0] === "string" ? args[0] : "0x0";
      setChain(parseInt(chainId, 16).toString());
    };

    provider.on?.("accountsChanged", handleAccountsChanged);
    provider.on?.("chainChanged", handleChainChanged);

    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
      provider.removeListener?.("chainChanged", handleChainChanged);
    };
  }, [provider]);

  const connect = async () => {
    if (!provider) {
      setError("MetaMask not detected.");
      return;
    }
    try {
      const accounts = await provider.request?.({
        method: "eth_requestAccounts",
      });
      if (Array.isArray(accounts) && accounts.length > 0) {
        setAccount(ethers.getAddress(accounts[0]));
        setError(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect wallet.",
      );
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-sky-500/20 p-2">
          <ShieldCheck className="h-5 w-5 text-sky-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Blockchain Settlement
          </h3>
          <p className="text-xs text-slate-400">
            Connect Ethereum wallet to notarize forecasts and settle incentives.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <button
          onClick={connect}
          className="w-full rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
        >
          {account ? "Connected" : "Connect MetaMask"}
        </button>
        {account && (
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-3 text-xs text-sky-100">
            <p>
              Account:{" "}
              <span className="font-mono">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            </p>
            {chain && <p>Chain ID: {chain}</p>}
          </div>
        )}
        {error && (
          <p className="text-xs text-rose-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
