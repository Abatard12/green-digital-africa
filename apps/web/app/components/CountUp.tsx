"use client";

import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";

type CountUpProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

const OPTIONS = { threshold: 0.4 };

export default function CountUp({ end, duration = 1600, suffix = "" }: CountUpProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>(OPTIONS);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setValue(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}