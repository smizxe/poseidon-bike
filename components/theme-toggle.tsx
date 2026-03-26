"use client";

import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewTransitionCapableDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => unknown;
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const transitionTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    setMounted(true);

    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const handleToggle = React.useCallback(() => {
    const root = document.documentElement;
    const nextTheme = isDark ? "light" : "dark";

    const finishTransition = () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }

      transitionTimeoutRef.current = window.setTimeout(() => {
        root.classList.remove("theme-animating");
      }, 520);
    };

    root.classList.add("theme-animating");

    const transitionDocument = document as ViewTransitionCapableDocument;

    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(() => {
        setTheme(nextTheme);
      });
      finishTransition();
      return;
    }

    setTheme(nextTheme);
    finishTransition();
  }, [isDark, setTheme]);

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      className={cn(
        "rounded-full border-border/70 bg-background/80 backdrop-blur-sm hover:bg-accent",
        className,
      )}
      onClick={handleToggle}
    >
      <SunMedium
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <MoonStar
        className={cn(
          "absolute size-4 transition-all duration-300",
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
        )}
      />
      <span className="sr-only">Đổi giao diện</span>
    </Button>
  );
}
