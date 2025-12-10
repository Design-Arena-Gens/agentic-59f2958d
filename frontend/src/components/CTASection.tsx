import Link from "next/link";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-cyan-600 to-indigo-700"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to orchestrate decentralized energy markets?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-100/90">
          Engage with our solutions team to deploy DEForecast across your DER
          fleet, microgrid, or VPP with production-ready SLAs.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            Launch Dashboard
          </Link>
          <a
            href="mailto:hello@deforecast.energy"
            className="rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

