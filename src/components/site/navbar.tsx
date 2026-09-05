import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { SECTIONS } from "./primitives";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-hairline bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="shell flex h-20 items-center justify-between" aria-label="Main">
        <a href="#home" className="flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none tracking-tight">SMG</span>
          <span className="eyebrow hidden sm:block">Investment Services</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {SECTIONS.slice(1, 6).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="relative text-sm text-foreground/75 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-forest hover:text-forest-foreground sm:inline-flex"
          >
            Talk to us
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hairline-t max-h-[calc(100dvh-5rem)] overflow-y-auto bg-background lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {SECTIONS.map((s) => (
                <li key={s.id} className="border-b border-hairline/60 last:border-0">
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 font-display text-3xl"
                  >
                    {s.label}
                    <span className="eyebrow">
                      {String(SECTIONS.indexOf(s) + 1).padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
