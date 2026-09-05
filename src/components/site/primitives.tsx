import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "how-it-works", label: "How It Works" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 22 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span aria-hidden className="inline-block h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  heading,
  paragraph,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: ReactNode;
  paragraph?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display-lg mt-6 text-balance">{heading}</h2>
      {paragraph ? (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {paragraph}
        </p>
      ) : null}
    </div>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "gold";
  className?: string;
};

export function LinkButton({ href, children, variant = "solid", className }: LinkButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variant === "solid" &&
          "bg-primary text-primary-foreground hover:bg-forest hover:text-forest-foreground",
        variant === "gold" && "bg-gold text-gold-foreground hover:brightness-105",
        variant === "outline" &&
          "border border-hairline bg-transparent text-foreground hover:border-foreground hover:bg-secondary",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
