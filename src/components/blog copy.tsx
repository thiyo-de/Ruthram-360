// src/pages/blog.tsx
import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type Post = {
  id: number;
  title: string;
  content: string[]; // paragraphs
};

const posts: Post[] = [
  {
    id: 1,
    title: "What is a Virtual Tour and why do audiences love it?",
    content: [
      "A virtual tour is an interactive 360° experience that simulates being inside a real place—on the web, mobile, or even in a headset.",
      "Unlike flat galleries, a tour connects panoramas so viewers can move naturally from room to room, look around freely, and learn through hotspots.",
      "From a UX perspective, the magic is cognitive mapping. Viewers build a mental model of layout and scale, reducing friction when they later visit or decide.",
      "Best-fit use cases include campuses, hospitals, hotels, schools, museums, real estate, and tourism—anywhere spatial context matters.",
      "Pro tip: design hotspots like micro-landing pages. Give each one a single job—inform, compare, or convert—and keep the density low.",
    ],
  },
  {
    id: 2,
    title: "3D Tours vs. 360 Tours: which one is right for you?",
    content: [
      "A 360° tour is made from stitched panoramic imagery. It’s fast, photoreal, and great for large areas.",
      "A 3D tour reconstructs depth—so you can move continuously through the model, generate floorplans, and take rough measurements.",
      "If your audience needs to feel a vibe, 360° is ideal. If they need spatial certainty, 3D shines.",
      "Hybrid strategies work well: lead with a cinematic 360° hero scene, then deep-link into 3D for technical stakeholders.",
      "Align hotspot naming and wayfinding to keep the hand-off seamless.",
    ],
  },
  {
    id: 3,
    title: "Publishing to Google Street View (GSV) for discovery",
    content: [
      "GSV embeds your interior or campus walkthrough directly on Google Maps and Search.",
      "Prospective visitors preview your space where they already are, using a UI they know.",
      "The benefits: higher time-on-listing, stronger trust signals, and better local discovery.",
      "For multi-building sites, map paths and entrances so navigation feels natural.",
      "Pair your GSV with a website tour for richer storytelling and conversion tracking.",
    ],
  },
  {
    id: 4,
    title: "Designing 360° content that actually converts",
    content: [
      "Treat every scene like a landing page: one promise, one action, and clear evidence.",
      "Use microcopy that speaks benefits, not features, and keep hotspot patterns consistent.",
      "Limit hotspots to the essentials or the tour will feel noisy and fatiguing.",
      "Add one conversion per scene—Book a visit, Apply now, Contact admissions.",
      "Make it accessible: keyboard navigation, captions, and readable contrast.",
    ],
  },
];

export default function Blog() {
  const [openId, setOpenId] = useState<number | null>(posts[0]?.id ?? null);
  const headingId = useId(); // stable for aria-labelledby on the list

  return (
    <section className="bg-[#f8f9fb] dark:bg-background">
      <div className="container mx-auto max-w-4xl px-6 py-12 sm:py-16">
        {/* === Header === */}

        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
            {/* Left triple bars – visible on all sizes, no shrink */}
            <motion.div
              initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2"
              aria-hidden="true"
            >
              <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
              <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
              <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
            </motion.div>

            {/* Title */}
            <h2
              id={headingId}
              className="font-heading font-bold tracking-tight leading-none flex items-center text-[22px] sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground"
            >
              <span className="text-gradient">FAQ</span>
            </h2>

            {/* Right triple bars – visible on all sizes, no shrink */}
            <motion.div
              initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
              className="flex shrink-0 items-center gap-1.5 sm:gap-2"
              aria-hidden="true"
            >
              <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
              <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
              <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Frequently asked questions
          </p>
        </div>

        {/* === FAQ / Accordion list === */}
        <div
          className="space-y-3 sm:space-y-4"
          role="list"
          aria-labelledby={headingId}
        >
          {posts.map((post) => {
            const isOpen = openId === post.id;
            const panelId = `faq-panel-${post.id}`;
            const buttonId = `faq-button-${post.id}`;

            return (
              <article
                key={post.id}
                role="listitem"
                className="rounded-2xl bg-white dark:bg-card ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-none overflow-hidden"
              >
                {/* Row header */}
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : post.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-3.5 sm:py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
                >
                  <span className="text-[15px] font-heading sm:text-base md:text-lg font-medium text-muted-foreground dark:text-neutral-100">
                    {post.title}
                  </span>
                  <span
                    className="inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full text-white bg-[#FF6A3D] shadow-sm"
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                {/* Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="space-y-3 text-[15px] sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                          {post.content.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
