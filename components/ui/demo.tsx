import { WaveAnimation } from "@/components/ui/wave-animation-1";

export default function DemoOne() {
  return (
    <main className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden">
      <span className="pointer-events-none absolute z-10 text-center font-heading text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Wave Animation
      </span>
      <WaveAnimation
        width={1200}
        height={600}
        waveSpeed={3}
        waveIntensity={50}
        particleColor="#1d4ed8"
        pointSize={2}
        gridDistance={2}
        className="rounded-lg border"
      />
    </main>
  );
}
