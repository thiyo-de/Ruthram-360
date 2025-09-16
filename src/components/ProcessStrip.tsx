// ProcessStrip.tsx — with Workflow heading (visible lines across devices)
import React from "react";
import { motion } from "framer-motion";

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Requirement Analysis",
    body: "We define your goals and deliverables clearly before starting.",
  },
  {
    n: "02",
    title: "On-Site Shooting",
    body: "High-quality 360° visuals and drone shots captured with precision.",
  },
  {
    n: "03",
    title: "Project Development",
    body: "We build immersive, branded, and interactive virtual experiences.",
  },
  {
    n: "04",
    title: "Quality Review",
    body: "Your feedback shapes final refinements to meet high standards.",
  },
  {
    n: "05",
    title: "Launch & Support",
    body: "Seamless launch with ongoing technical support and updates.",
  },
];

export default function ProcessStrip() {
  return (
    <section className="bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Heading with decorative lines */}
          <div className="flex items-center justify-center gap-3">
            {/* Left triple bars */}
            <motion.div
              initial={{ opacity: 0, x: -12, scaleY: 0.85 }}
              whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-center gap-1.5 sm:gap-2 will-change-transform"
              aria-hidden="true"
            >
              <span className="w-0.5 min-w-[2px] rounded-full h-3 sm:h-3.5 md:h-4 bg-foreground/10" />
              <span className="w-0.5 min-w-[2px] rounded-full h-5 sm:h-6 md:h-7 bg-foreground/10" />
              <span className="w-0.5 min-w-[2px] rounded-full h-7 sm:h-8 md:h-9 bg-foreground/10" />
            </motion.div>

            {/* Title */}
            <h2 className="font-heading font-bold tracking-tight leading-none flex items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
              Our <span className="ml-2 text-gradient">Workflow</span>
            </h2>

            {/* Right triple bars */}
            <motion.div
              initial={{ opacity: 0, x: 12, scaleY: 0.85 }}
              whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
              className="flex items-center gap-1.5 sm:gap-2 will-change-transform"
              aria-hidden="true"
            >
              <span className="w-0.5 min-w-[2px] rounded-full h-7 sm:h-8 md:h-9 bg-foreground/10" />
              <span className="w-0.5 min-w-[2px] rounded-full h-5 sm:h-6 md:h-7 bg-foreground/10" />
              <span className="w-0.5 min-w-[2px] rounded-full h-3 sm:h-3.5 md:h-4 bg-foreground/10" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A streamlined process that ensures clarity, precision, and
            high-quality outcomes at every stage.
          </p>
        </div>

        {/* Steps wrapper */}
        <div className="relative">
          {/* Desktop grid separators (centered between columns) */}
          <div className="hidden lg:block">
            {Array.from({ length: STEPS.length - 1 }).map((_, i) => (
              <span
                key={`sep-${i}`}
                className="absolute inset-y-0 w-0.5 min-w-[2px] bg-foreground/15 transform -translate-x-1/2"
                style={{ left: `${(100 / STEPS.length) * (i + 1)}%` }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 sm:gap-x-8 lg:gap-x-10">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className="relative pr-2 sm:pr-4 pl-5 sm:pl-6 lg:pl-8 flex flex-col"
              >
                {/* Mobile/tablet vertical line */}
                <span
                  className="absolute inset-y-0 left-0 w-0.5 min-w-[2px] bg-foreground/15 rounded-full lg:hidden"
                  aria-hidden="true"
                />

                {/* Number */}
                <div className="relative h-[72px] sm:h-[84px] md:h-[96px] lg:h-[108px]">
                  <span
                    className="absolute bottom-0 left-0 select-none leading-none font-extrabold tracking-tight text-primary text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px]"
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-semibold text-muted-foreground">
                  {s.title}
                </h3>

                {/* Body */}
                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-muted-foreground max-w-[40ch]">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
