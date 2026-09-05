import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { Eyebrow } from "./primitives";

/**
 * PLACEHOLDER DATA — replace each entry with a real testimonial.
 * Keys map 1:1 to the required fields: image, quote, name, rating.
 */
const testimonials = [
  {
    image: null as string | null,
    initials: "AB",
    quote:
      "Testimonial placeholder — replace this text with the customer's own words about their experience with SMG Investment Services.",
    name: "Customer Name",
    role: "Maharagama branch",
    rating: 5,
  },
  {
    image: null as string | null,
    initials: "CD",
    quote:
      "Testimonial placeholder — replace this text with the customer's own words about the valuation and loan process.",
    name: "Customer Name",
    role: "Kottawa branch",
    rating: 5,
  },
  {
    image: null as string | null,
    initials: "EF",
    quote:
      "Testimonial placeholder — replace this text with the customer's own words about service and confidentiality.",
    name: "Customer Name",
    role: "Nugegoda branch",
    rating: 5,
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index]!;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="hairline-t py-20 md:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="display-lg mt-6 max-w-[18ch] text-balance">
              What Our Customers Say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-secondary"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="inline-flex size-12 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-secondary"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-hairline pt-12 lg:grid-cols-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="contents"
            >
              <div className="lg:col-span-4">
                <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-sm border border-hairline bg-accent/60">
                  {active.image ? (
                    <img
                      src={active.image}
                      alt={`${active.name}, SMG Investment Services customer`}
                      loading="lazy"
                      className="size-full rounded-sm object-cover"
                    />
                  ) : (
                    <span className="font-display text-5xl text-foreground/50" aria-hidden>
                      {active.initials}
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="flex gap-1" aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden
                      className={
                        i < active.rating
                          ? "size-4 fill-gold text-gold"
                          : "size-4 text-muted-foreground"
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-8 font-display text-3xl leading-tight text-balance md:text-4xl">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="text-base font-medium">{active.name}</span>
                  <span aria-hidden className="h-px w-8 bg-hairline" />
                  <span className="eyebrow">{active.role}</span>
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.role}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-px w-12 transition-all duration-300 ${
                i === index ? "bg-foreground" : "bg-hairline hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
