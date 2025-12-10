export function MapCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <h3 className="text-lg font-semibold text-white">
        DER Network Topology
      </h3>
      <p className="text-xs text-slate-400">
        Geospatial clusters colored by forecast deviation and contract settlement status.
      </p>
      <div className="mt-4 h-64 rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black">
        <svg
          viewBox="0 0 400 260"
          className="h-full w-full"
          role="presentation"
        >
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="alertGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.2">
            <line x1="60" y1="70" x2="180" y2="120" />
            <line x1="180" y1="120" x2="340" y2="90" />
            <line x1="180" y1="120" x2="210" y2="210" />
            <line x1="60" y1="70" x2="120" y2="200" />
            <line x1="340" y1="90" x2="300" y2="200" />
          </g>
          <g>
            <circle cx="60" cy="70" r="28" fill="url(#nodeGradient)" />
            <circle cx="180" cy="120" r="36" fill="url(#nodeGradient)" />
            <circle cx="340" cy="90" r="30" fill="url(#alertGradient)" />
            <circle cx="120" cy="200" r="22" fill="url(#nodeGradient)" />
            <circle cx="210" cy="210" r="26" fill="url(#nodeGradient)" />
            <circle cx="300" cy="200" r="20" fill="url(#nodeGradient)" />
          </g>
          <g fill="white" fontSize="12" textAnchor="middle">
            <text x="60" y="72">West</text>
            <text x="180" y="122">Hub</text>
            <text x="340" y="92">East</text>
            <text x="120" y="202">South</text>
            <text x="210" y="212">Battery</text>
            <text x="300" y="202">North</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

