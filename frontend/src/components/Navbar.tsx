/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "#architecture", label: "Architecture" },
  { href: "#features", label: "Features" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const isLanding = useMemo(() => pathname === "/", [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Decentralized Energy Forecasting"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold tracking-wide text-slate-100">
            DEForecast
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-slate-100 ${
                pathname === link.href ||
                (!isLanding && link.href === "/dashboard" && pathname?.startsWith("/dashboard"))
                  ? "text-sky-400"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-sky-400"
        >
          Launch App
        </Link>
      </div>
    </header>
  );
}

