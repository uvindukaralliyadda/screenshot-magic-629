import { motion } from "motion/react";

import { SectionHeader, staggerChild, staggerParent } from "./primitives";

const benefits = [
  {
    title: "30+ Years of Trust",
    body: "Established in 1995, with decades of experience serving our customers.",
  },
  {
    title: "No Loan Limits",
    body: "No maximum or minimum loan amount, with small loan requests accepted subject to conditions.",
  },
  {
    title: "No Guarantors Required",
    body: "Get the financial assistance you need without the need for a guarantor.",
  },
  {
    title: "Competitive Interest Rates",
    body: "Benefit from competitive low interest rates designed to provide greater value.",
  },
  {
    title: "Advanced Gold Testing",
    body: "Modern gold purity testing technology without scraping or damaging your gold articles.",
  },
  {
    title: "Guaranteed Security",
    body: "Your pawned gold articles are handled with the highest level of care and security.",
  },
  {
    title: "Flexible Installments",
    body: "Make installment payments conveniently at any of our branches.",
  },
  {
    title: "Fast & Courteous Service",
    body: "A simple process backed by friendly, professional, and efficient customer service.",
  },
  {
    title: "Privacy & Confidentiality",
    body: "Your personal information and financial dealings are treated with complete privacy.",
  },
  {
    title: "Convenient Branch Network",
    body: "Visit us at our branches in Maharagama, Kottawa, or Nugegoda.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="hairline-t py-20 md:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Why Choose Us"
          heading="Gold Pawning Made Simple"
          paragraph="With 30+ years of experience, we make gold pawning simple, secure, and convenient with flexible options and customer-focused service."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              variants={staggerChild}
              className="group relative border-b border-hairline px-0 py-8 transition-colors duration-500 sm:px-7 sm:odd:border-r lg:border-r lg:px-8 lg:[&:nth-child(3n)]:border-r-0 hover:bg-secondary/70"
            >
              <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-2xl leading-tight">{b.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
