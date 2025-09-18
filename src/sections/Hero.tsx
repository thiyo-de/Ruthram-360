import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import BG from "../Assets/bg.jpg";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

/* ---------- Animations ---------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

/* ---------- Count up (accessible, reduced-motion friendly) ---------- */
function useCountUp(to: number, duration = 1200) {
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    let start: number | null = null;

    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.round(to * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, prefersReduced]); // ✅ FIX

  return value;
}

const Hero = () => {
  const prefersReduced = useReducedMotion();

  const words = [
    "Premium",
    "Virtual",
    "Tours",
    "&",
    "Google",
    "Street",
    "View",
  ];

  // Stable floating particles
  const floaters = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
    []
  );

  // Animated counters
  const tours = useCountUp(35);
  const satisfaction = useCountUp(100);
  const capture = useCountUp(8);

  return (
    <section
      className="relative min-h-[92svh] md:min-h-screen flex items-center justify-center overflow-hidden
                 pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${BG})` }}
        aria-hidden
      />

      {/* Animated gradient waves overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/90 to-white/90 mix-blend-normal" />
        {/* gentle wave using radial gradients */}
        <div className="absolute -inset-8 opacity-60 blur-2xl">
          <div className="absolute -top-20 -left-20 w-[50%] aspect-square rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.orange.300/.25),transparent_60%)]" />
          <div className="absolute -bottom-24 -right-16 w-[55%] aspect-square rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.amber.400/.2),transparent_60%)]" />
        </div>
      </div>

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 -z-10 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%23cccccc' fill-opacity='0.4'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Floating particles */}
      {!prefersReduced && (
        <div className="pointer-events-none absolute inset-0">
          {floaters.map((f) => (
            <motion.div
              key={f.id}
              className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-primary/30 rounded-full"
              style={{ left: f.left, top: f.top }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: f.duration,
                repeat: Infinity,
                delay: f.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-[1100px] text-center"
        >
          {/* Main Headline */}
          <div className="mb-6 sm:mb-8">
            <h1 id="hero-title" className="sr-only">
              Premium Virtual Tours & Google Street View
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-2">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className={[
                    "font-heading heading-hero tracking-tight leading-none font-black",
                    ["Premium", "Virtual"].includes(word)
                      ? "text-gradient"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto max-w-[48rem] text-[14.5px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                       font-satoshi text-muted-foreground leading-relaxed px-2 sm:px-3 md:px-0
                       mb-8 md:mb-10"
          >
            Transform your business with immersive 360° experiences.
            Professional virtual tours that showcase your space like never
            before.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2"
          >
            <MotionLink
              to="/contact"
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.96 }}
              className="btn-primary inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
              aria-label="Get Started Today"
            >
              <span>Get Started Today</span>
              <ArrowRight className="size-4 sm:size-5" />
            </MotionLink>

            <MotionLink
              to="/portfolio"
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.96 }}
              className="btn-glass text-muted-foreground inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
              aria-label="Our Works"
            >
              <span>Our Works</span>
              <motion.span
                aria-hidden
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MotionLink>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5"
          >
            {[
              "Google Street View • Trusted",
              "Matterport • Partner",
              "Google Standard",
            ].map((label) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-white/70 dark:bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-muted-foreground backdrop-blur"
                title={label}
              >
                <BadgeCheck className="size-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Stats (soft gradient cards + animated counters) */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8
                       mt-10 sm:mt-12 md:mt-14 lg:mt-16 px-2 sm:px-0 items-stretch"
          >
            {[
              { value: tours, suffix: "+", label: "Tours Created" },
              {
                value: satisfaction,
                suffix: "%",
                label: "Client Satisfaction",
              },
              { value: capture, suffix: "K", label: "Capture Quality" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                variants={wordVariants}
                transition={{ duration: 0.55, delay: 0.6 + idx * 0.1 }}
                className="h-full p-4 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center gap-1.5
                           rounded-2xl border border-foreground/10
                           bg-gradient-to-br from-primary/5 via-white/70 to-amber-50/60
                           dark:from-primary/10 dark:via-white/5 dark:to-white/0 backdrop-blur"
              >
                <div className="font-heading leading-none tracking-tight text-primary font-extrabold text-[20px] sm:text-[24px] md:text-[30px] lg:text-[36px]">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="font-satoshi text-muted-foreground text-[12.5px] sm:text-sm md:text-base leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade overlay */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-60 z-0
                   bg-gradient-to-b from-transparent via-white/50 to-white"
        aria-hidden
      />

      {/* Scroll Indicator */}
      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none
               bottom-3 sm:bottom-5 md:bottom-6 max-[420px]:hidden"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 md:w-7 md:h-12 border-2 rounded-full
                 flex justify-center items-start border-[hsl(var(--foreground)_/_0.25)]
                 bg-white/60 backdrop-blur-[2px]"
          >
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2.5 bg-primary rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
