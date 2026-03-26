import { cn } from "@/lib/utils";

type BikeKind = "road" | "mtb" | "touring" | "fold";

interface BikeVisualProps {
  primary: string;
  secondary: string;
  glow?: string;
  kind?: BikeKind;
  className?: string;
  label?: string;
}

const kindConfig: Record<
  BikeKind,
  {
    tireWidth: number;
    handlebarPath: string;
    seatY: number;
    stemY: number;
    baseLineY: number;
  }
> = {
  road: {
    tireWidth: 10,
    handlebarPath: "M284 110 C304 84 314 84 324 102",
    seatY: 106,
    stemY: 114,
    baseLineY: 162,
  },
  mtb: {
    tireWidth: 16,
    handlebarPath: "M284 114 C302 94 316 94 332 112",
    seatY: 100,
    stemY: 116,
    baseLineY: 164,
  },
  touring: {
    tireWidth: 12,
    handlebarPath: "M284 114 C298 106 312 104 326 112",
    seatY: 102,
    stemY: 116,
    baseLineY: 162,
  },
  fold: {
    tireWidth: 12,
    handlebarPath: "M280 114 C296 98 306 98 316 112",
    seatY: 104,
    stemY: 116,
    baseLineY: 166,
  },
};

export function BikeVisual({
  primary,
  secondary,
  glow = primary,
  kind = "road",
  className,
  label,
}: BikeVisualProps) {
  const config = kindConfig[kind];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_35px_90px_-60px_rgba(37,99,235,0.5)]",
        className,
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at 22% 14%, ${glow}33, transparent 32%),
          radial-gradient(circle at 82% 18%, ${secondary}20, transparent 28%),
          linear-gradient(140deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.78) 55%, rgba(2, 6, 23, 0.94))
        `,
      }}
    >
      <div className="absolute inset-0 card-sheen" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-sky-400/10 to-transparent" />
      <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase">
        {label ?? kind}
      </div>

      <svg
        viewBox="0 0 420 240"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Minh hoạ xe đạp Poseidon"
      >
        <defs>
          <linearGradient id={`frame-${primary}`} x1="0" x2="1">
            <stop offset="0%" stopColor={secondary} />
            <stop offset="100%" stopColor={primary} />
          </linearGradient>
          <linearGradient id={`rim-${primary}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.36" />
          </linearGradient>
        </defs>

        <g opacity="0.18" stroke="#7dd3fc" strokeWidth="1">
          <path d="M35 188 H385" />
          <path d="M80 54 H352" />
        </g>

        <circle
          cx="110"
          cy={config.baseLineY}
          r="48"
          fill="none"
          stroke={`url(#rim-${primary})`}
          strokeWidth={config.tireWidth}
        />
        <circle
          cx="306"
          cy={config.baseLineY}
          r="48"
          fill="none"
          stroke={`url(#rim-${primary})`}
          strokeWidth={config.tireWidth}
        />

        <g stroke={`url(#frame-${primary})`} strokeLinecap="round" strokeWidth="8" fill="none">
          <path d="M110 162 L175 112 L236 162 Z" />
          <path d="M175 112 L214 82" />
          <path d="M214 82 L236 162" />
          <path d="M175 112 L284 114" />
          <path d="M236 162 L306 162" />
          <path d="M284 114 L306 162" />
          <path d={config.handlebarPath} />
          <path d={`M214 82 L214 ${config.seatY}`} />
        </g>

        <g stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round">
          <path d={`M200 ${config.seatY} H228`} />
          <path d={`M284 ${config.stemY} H313`} />
        </g>

        <g stroke="#7dd3fc" strokeWidth="2" opacity="0.4">
          <path d="M175 112 L142 162" />
          <path d="M236 162 L284 114" />
        </g>

        <circle cx="175" cy="112" r="7" fill="#e2e8f0" />
        <circle cx="236" cy="162" r="8" fill="#bfdbfe" />
      </svg>
    </div>
  );
}
