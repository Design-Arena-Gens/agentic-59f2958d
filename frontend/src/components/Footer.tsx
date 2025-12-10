export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-4 text-sm text-slate-400 sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} DEForecast. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/docs/architecture" className="hover:text-white">
            Architecture
          </a>
          <a href="mailto:security@deforecast.energy" className="hover:text-white">
            Security
          </a>
          <a href="mailto:careers@deforecast.energy" className="hover:text-white">
            Careers
          </a>
        </div>
      </div>
    </footer>
  );
}

