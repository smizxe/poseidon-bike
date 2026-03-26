"use client";

import { useTheme } from "next-themes";

import { WaveAnimation } from "@/components/ui/wave-animation-1";

interface PoseidonWaveProps {
  className?: string;
  height?: number;
  intensity?: number;
  speed?: number;
  pointSize?: number;
  gridDistance?: number;
  particleColor?: string;
  baselineY?: number;
}

export function PoseidonWave({
  className,
  height = 560,
  intensity = 34,
  speed = 1.6,
  pointSize = 1.6,
  gridDistance = 4,
  particleColor,
  baselineY,
}: PoseidonWaveProps) {
  const { resolvedTheme } = useTheme();
  const waveColor =
    particleColor ?? (resolvedTheme === "dark" ? "#7dd3fc" : "#1d4ed8");

  return (
    <WaveAnimation
      height={height}
      particles={5200}
      waveSpeed={speed}
      waveIntensity={intensity}
      pointSize={pointSize}
      particleColor={waveColor}
      gridDistance={gridDistance}
      baselineY={baselineY}
      className={className}
    />
  );
}
