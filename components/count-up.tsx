"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 1400,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rafId = window.requestAnimationFrame(() => {
      setPrefersReducedMotion(mediaQuery.matches);
    });

    if (mediaQuery.matches) {
      return () => window.cancelAnimationFrame(rafId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [end]);

  useEffect(() => {
    if (!started) return;

    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, end, started]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(prefersReducedMotion ? end : value).toLocaleString("vi-VN")}
      {suffix}
    </span>
  );
}
