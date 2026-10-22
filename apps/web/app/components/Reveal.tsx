"use client";

import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type RevealProps = {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "none";
  delay?: number;
  className?: string;
};

const OPTIONS = { threshold: 0.15 };

const hiddenState = {
  up: "translate-y-6",
  left: "-translate-x-10",
  right: "translate-x-10",
  none: "",
};

export default function Reveal({ children, direction = "up", delay = 0, className = "" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(OPTIONS);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        isInView ? "translate-x-0 translate-y-0 opacity-100" : `${hiddenState[direction]} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
}