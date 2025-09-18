import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Camera,
  Compass,
  Images,
  Video,
  Drone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  BadgeCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Assets (use your existing files) ---------- */
import Service_BG from "../Assets/Service.jpg";
import VR_Tourism from "../Assets/VR_Tourism.jpg";
import VR1 from "../Assets/VR1.jpg";
import GSV_IMG from "../Assets/GSV.jpg";
import PHOTO_360 from "../Assets/360_PHOTO.jpg";
import DRONE from "../Assets/DRONE.jpg";
import VIDEO_360 from "../Assets/VIDEO_360.jpg";
import AU1 from "../Assets/AU.jpg";
import MSU1 from "../Assets/MSU.jpg";
import SONACT from "../Assets/SONACT.jpg";
import TPC from "../Assets/TPC.jpg";
import TREAT from "../Assets/TREAT MSME.jpg";
import DSCE1 from "../Assets/DSCE1.jpeg";
import AU_Museum from "../Assets/Vallal Dr. Alagappar Museum.jpg";
import ProcessStrip from "@/components/ProcessStrip";

const MotionLink = motion(Link);

/* =========================================================
   Types & Data
========================================================= */
type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
};

type ServicesHeroProps = {
  background: string; // bg image
  eyebrow?: string; // default: "Services"
  headline?: string; // default: "Virtual Tours that Convert"
  subcopy?: string; // default: "8K capture…"
  chips?: string[]; // default: ["8K Quality","Interactive Hotspots","48-Hour Delivery"]
  minHeightClass?: string; // optional: override height
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const allServices: Service[] = [
  {
    id: "svc-virtual-tours",
    icon: Camera,
    title: "Virtual Tours",
    description:
      "Immersive 360° virtual tours that let customers explore your space from anywhere.",
    features: ["8K Quality", "Interactive Hotspots", "All Devices Friendly"],
    image: VR1,
    popular: true,
  },
  {
    id: "svc-commercial",
    icon: Compass,
    title: "360 Degree 3D Tour",
    description:
      "Immersive 360° 3D virtual tours that allow your audience to explore spaces interactively with a real sense of presence.",
    features: [
      "Immersive 3D Experience",
      "Interactive Navigation",
      "Boosts Engagement",
    ],
    image: VR_Tourism,
  },
  {
    id: "svc-gsv",
    icon: MapPin,
    title: "Google Street View",
    description:
      "Professional Google Street View imagery to boost your local search presence and discovery.",
    features: [
      "Google Standard",
      "SEO Benefits",
      "Local Discovery",
      "Business Listings",
    ],
    image: GSV_IMG,
  },
  {
    id: "svc-realestate",
    icon: Images,
    title: "360° Photography",
    description:
      "Crystal-clear HDR 360° stills for interiors & exteriors—perfect for websites, Google profiles, and VR tours.",
    features: ["HDR Processing", "Branding Overlays", "Web/VR Optimized"],
    image: PHOTO_360,
  },
  {
    id: "svc-hospitality",
    icon: Drone,
    title: "360° Aerial Video (Drone)",
    description:
      "Showcase scale, routes, and surroundings with breathtaking overhead 360° motion footage.",
    features: [
      "Planned & compliant flights",
      "Cinematic paths",
      "5.7K Exports",
    ],
    image: DRONE,
  },
  {
    id: "svc-360video",
    icon: Video,
    title: "360° Videography & Immersive",
    description:
      "Walk-through 360° videos with interactive hotspots, chapters, and CTAs to drive engagement and leads.",
    features: [
      "Stabilized Motion",
      "Interactive Overlays",
      "YouTube/Meta VR Ready",
    ],
    image: VIDEO_360,
  },
];

const testimonials = [
  {
    name: "Selladurai",
    role: "Sona College of Technology",
    avatar: SONACT,
    rating: 5,
    quote:
      "The virtual campus tour boosted engagement on our admissions pages and cut routine inquiry calls—students arrive for visits already oriented.",
  },
  {
    name: "Arun Kumar",
    role: "Manonmaniam Sundaranar University",
    avatar: MSU1,
    rating: 5,
    quote:
      "Our virtual tour improved discovery and reduced hotline traffic—students show up knowing the campus and what to ask next.",
  },
  {
    name: "Joseph",
    role: "Alagappa University",
    avatar: AU1,
    rating: 5,
    quote:
      "Prospective students now explore labs, libraries, and housing online first—fewer basic queries, more meaningful admissions discussions.",
  },
  {
    name: "Rahul Iyer",
    role: "Thiagarajar Polytechnic College",
    avatar: TPC,
    rating: 5,
    quote:
      "The 360° tour gives applicants a real feel for campus; info calls decreased and our open-house conversations got deeper.",
  },
  {
    name: "Anita Joseph",
    role: "TREAT MSME",
    avatar: TREAT,
    rating: 5,
    quote:
      "Embedding safety checkpoints and SOP callouts in the tour reduced orientation and keeps audits running smoothly.",
  },
  {
    name: "Vikas Gupta",
    role: "Dhanalakshmi Srinivasan College of Engineering",
    avatar: DSCE1,
    rating: 4,
    quote:
      "Since launching the campus tour, time-on-page is up and repetitive questions are down—families come prepared and confident.",
  },
  {
    name: "Curator Team",
    role: "Alagappa University Museum",
    avatar: AU_Museum,
    rating: 4,
    quote:
      "Matterport-powered 3D tours that let visitors explore exhibitions with guided narration, interactive labels, and room-to-room navigation.",
  },
];

/* =========================================================
   Shared Animation / Utilities
========================================================= */
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
  }, [to, duration, prefersReduced]);
  return value;
}
const rAF = () =>
  new Promise<void>((res) => requestAnimationFrame(() => res()));
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/* =========================================================
   Services Hero (Banner Style + Bottom Fade) — refined
========================================================= */
function ServicesHero() {
  const prefersReduced = useReducedMotion();

  const words = ["Our", "Services"];

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

  return (
    <section
      className="relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden
                 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16"
      aria-labelledby="svc-hero-title"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        // tip: adjust position to keep subject clear of the strongest overlay area
        // className="absolute inset-0 -z-20 bg-cover bg-[position:50%_30%]"
        style={{ backgroundImage: `url(${Service_BG})` }}
        aria-hidden
      />

      {/* Blur + overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[3px]" />
        <div className="absolute -inset-8 md:opacity-60 opacity-40 blur-2xl">
          <div
            className="absolute -top-20 -left-20 w-[50%] aspect-square rounded-full 
                          bg-[radial-gradient(ellipse_at_center,theme(colors.orange.300/.25),transparent_60%)]"
          />
          <div
            className="absolute -bottom-24 -right-16 w-[55%] aspect-square rounded-full 
                          bg-[radial-gradient(ellipse_at_center,theme(colors.amber.400/.2),transparent_60%)]"
          />
        </div>
      </div>

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 -z-10 md:opacity-30 opacity-20 mix-blend-overlay"
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
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-[900px]"
        >
          {/* Eyebrow */}
          <motion.span
            variants={wordVariants}
            className="inline-flex mb-2 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium 
                       bg-black/5 text-muted-foreground ring-1 ring-foreground/10 backdrop-blur"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Services
          </motion.span>

          {/* Headline (semantic h1, visible) */}
          <h1 id="svc-hero-title" className="sr-only">
            Our Services
          </h1>
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className={[
                    "font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight",
                    word === "Services"
                      ? "text-gradient"
                      : "text-muted-foreground",
                  ].join(" ")}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subcopy */}
          <motion.p
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto max-w-[42rem] text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Comprehensive virtual tour solutions tailored to your industry
            needs.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96 z-0
                   bg-gradient-to-b from-transparent via-white/40 to-white"
        aria-hidden
      />
    </section>
  );
}

/* =========================================================
   Services Coverflow (looping)
========================================================= */
function ServicesCoverflow({
  services,
  onSelect,
}: {
  services: Service[];
  onSelect: (s: Service) => void;
}) {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLButtonElement | null>(null);

  const [step, setStep] = useState<number>(360);
  const [ready, setReady] = useState(false);

  const loopedServices = useMemo(
    () => [...services, ...services, ...services],
    [services]
  );

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current,
        card = cardRef.current,
        wrap = wrapRef.current;
      if (!track || !card || !wrap) return;
      const slideW = card.offsetWidth;
      const cs = window.getComputedStyle(track);
      const rawGap =
        cs.getPropertyValue("gap") || cs.getPropertyValue("column-gap") || "0";
      const gapMatch = rawGap.match(/([\d.]+)px/);
      const gap = gapMatch ? parseFloat(gapMatch[1]) : 0;
      setStep(Math.round(slideW + gap));
      wrap.style.setProperty("--wrapW", `${wrap.clientWidth}px`);
      wrap.style.setProperty("--slideW", `${slideW}px`);
    };
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (cardRef.current) ro.observe(cardRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    measure();
    setReady(true);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const third = Math.round(step * allServices.length);

    const updateTransforms = () => {
      if (prefersReduced) return;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const children = Array.from(el.children) as HTMLElement[];

      const info = children.map((c) => {
        const cr = c.getBoundingClientRect();
        const near =
          cr.right > rect.left - cr.width * 0.5 &&
          cr.left < rect.right + cr.width * 0.5;
        return { c, cr, near };
      });

      let closestIdx = -1;
      let closestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < info.length; i++) {
        const { c, cr, near } = info[i];
        if (!near) {
          c.style.transform = "";
          c.style.opacity = "0.75";
          c.style.filter = "none";
          c.removeAttribute("aria-current");
          continue;
        }
        const cardCenter = cr.left + cr.width / 2;
        const dist = (cardCenter - center) / cr.width;
        const ad = Math.abs(dist);
        if (ad < closestDist) {
          closestDist = ad;
          closestIdx = i;
        }
        const scale = clamp(1 - 0.1 * ad, 0.9, 1);
        const rotateY = clamp(-12 * dist, -12, 12);
        const opacity = clamp(1 - 0.35 * ad, 0.65, 1);
        const blur = clamp(0.5 * ad, 0, 0.5);
        c.style.transform = `translate3d(0,0,0) scale(${scale}) rotateY(${rotateY}deg)`;
        c.style.opacity = String(opacity);
        c.style.filter = blur > 0.05 ? `blur(${blur}px)` : "none";
      }

      if (closestIdx >= 0) {
        info.forEach(({ c }, i) => {
          if (i === closestIdx) c.setAttribute("aria-current", "true");
          else c.removeAttribute("aria-current");
        });
      }
    };

    const recenterIfNeeded = () => {
      const left = el.scrollLeft;
      const nearStart = left < third * 0.5;
      const nearEnd = left > third * 1.5;
      if (nearStart) el.scrollLeft = left + third;
      else if (nearEnd) el.scrollLeft = left - third;
    };

    const centerToMiddle = async () => {
      await rAF();
      await rAF();
      el.scrollLeft = third;
      await rAF();
      updateTransforms();
    };

    centerToMiddle();

    let ticking = false;
    const onScroll = () => {
      recenterIfNeeded();
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateTransforms();
        ticking = false;
      });
    };
    const onResize = () => requestAnimationFrame(updateTransforms);

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [step, prefersReduced]);

  const withNoSnapDuring = useCallback((fn: () => void) => {
    const el = trackRef.current;
    if (!el) return;
    el.classList.add("no-snap");
    const cleanup = addScrollEndOnce(el, () => {
      el.classList.remove("no-snap");
    });
    fn();
    return cleanup;
  }, []);
  const invisibleWrap = useCallback(async (jump: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.classList.add("no-snap");
    el.scrollLeft = Math.round(el.scrollLeft + jump);
    await rAF();
    el.classList.remove("no-snap");
  }, []);
  const go = useCallback(
    async (dir: "left" | "right") => {
      const el = trackRef.current;
      if (!el) return;
      const third = Math.round(step * allServices.length);
      const current = el.scrollLeft;
      const delta = dir === "left" ? -step : step;

      if (dir === "left" && current - step < third * 0.5) {
        await invisibleWrap(+third);
      } else if (dir === "right" && current + step > third * 1.5) {
        await invisibleWrap(-third);
      }

      withNoSnapDuring(() => {
        el.scrollTo({
          left: Math.round(el.scrollLeft + delta),
          behavior: "smooth",
        });
      });
    },
    [invisibleWrap, step, withNoSnapDuring]
  );
  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        void go("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        void go("right");
      }
    },
    [go]
  );

  return (
    <div
      ref={wrapRef}
      className="relative cf-wrap"
      onKeyDownCapture={onKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Services (use left and right arrows to navigate)"
    >
      <style>{`
        .no-snap { scroll-snap-type: none !important; }
        .cf-track {
          display:flex; align-items:stretch; gap:24px; overflow-x:auto;
          scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch;
          scrollbar-width:none; overscroll-behavior-x:contain;
          padding-block:8px;
          padding-inline:max(calc((var(--wrapW,100%) - var(--slideW,340px)) / 2),16px);
        }
        .cf-track::-webkit-scrollbar { display:none; }
        .cf-slide {
          width:var(--slideW,340px); aspect-ratio:9/16; scroll-snap-align:center;
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, opacity .25s, filter .25s;
          border-radius:28px; overflow:hidden; background:#000; box-shadow:0 10px 30px rgba(0,0,0,.08);
          contain:content; will-change:transform, opacity, filter;
        }
        .cf-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:blur(.2px); }
        .cf-overlay { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,.45) 100%); }
        @media (prefers-reduced-motion: reduce) { .cf-slide{transition:none!important} .cf-track *{filter:none!important; transform:none!important} }
        @media (max-width:767px){ .cf-wrap{ --slideW:300px } }
        @media (min-width:768px){ .cf-wrap{ --slideW:360px } }
      `}</style>

      <div
        ref={trackRef}
        className={`cf-track transition-opacity duration-200 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Service cards"
        role="group"
        aria-live="polite"
      >
        {loopedServices.map((s, idx) => {
          const eager = idx < 2;
          return (
            <button
              key={`${s.id}-${idx}`}
              ref={idx === 0 ? cardRef : undefined}
              className="cf-slide relative flex-shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => onSelect(s)}
              aria-label={`${s.title} details`}
            >
              <img
                src={s.image}
                alt={`${s.title} preview`}
                className="cf-img"
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                sizes="(max-width: 768px) 300px, 360px"
                fetchPriority={eager ? "high" : "low"}
              />
              <div className="cf-overlay" aria-hidden="true" />
              <div className="absolute bottom-0 w-full p-4">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-black/55 ring-1 ring-white/15 px-3 py-2 shadow backdrop-blur-sm">
                  <s.icon className="w-4 h-4 text-white" aria-hidden="true" />
                  <span className="text-white font-semibold text-sm">
                    {s.title}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-6 z-[3]">
        <div className="pointer-events-auto">
          <button
            aria-label="Previous"
            onClick={() => void go("left")}
            className="rounded-full p-3 bg-background/90 border border-black/5 shadow-sm backdrop-blur-md hover:bg-background transition w-12 h-12 flex items-center justify-center"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="pointer-events-auto">
          <button
            aria-label="Next"
            onClick={() => void go("right")}
            className="rounded-full p-3 bg-background/90 border border-black/5 shadow-sm backdrop-blur-md hover:bg-background transition w-12 h-12 flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* Utility: scrollend once with timeout fallback */
function addScrollEndOnce(
  element: HTMLElement,
  handler: (ev: Event) => void,
  timeoutMs = 600
) {
  let cleaned = false;
  const listener: EventListener = (ev) => {
    if (cleaned) return;
    cleaned = true;
    handler(ev);
  };
  element.addEventListener("scrollend", listener, { once: true });
  const timeoutId = window.setTimeout(() => {
    if (cleaned) return;
    cleaned = true;
    handler(new Event("scrollend"));
    element.removeEventListener("scrollend", listener);
  }, timeoutMs);
  return () => {
    window.clearTimeout(timeoutId);
    element.removeEventListener("scrollend", listener);
    cleaned = true;
  };
}

/* =========================================================
   Page Component
========================================================= */
const Services = () => {
  const [selected, setSelected] = useState<Service | null>(null);
  const prefersReduced = useReducedMotion();

  // Modal a11y + body lock
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  // Testimonials strip
  const stripRef = useRef<HTMLDivElement | null>(null);
  const firstTCardRef = useRef<HTMLDivElement | null>(null);
  const [cardStep, setCardStep] = useState<number>(360);

  useEffect(() => {
    const measure = () => {
      const track = stripRef.current,
        firstCard = firstTCardRef.current;
      if (!track || !firstCard) return;
      const cardW = firstCard.offsetWidth;
      const cs = window.getComputedStyle(track);
      const rawGap =
        cs.getPropertyValue("gap") || cs.getPropertyValue("column-gap") || "0";
      const gapMatch = rawGap.match(/([\d.]+)px/);
      const gap = gapMatch ? parseFloat(gapMatch[1]) : 0;
      setCardStep(Math.round(cardW + gap));
    };
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    if (firstTCardRef.current) ro.observe(firstTCardRef.current);
    measure();
    return () => ro.disconnect();
  }, []);

  const loopedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    []
  );

  const wrapIfNeeded = useCallback(
    async (dir: "left" | "right") => {
      const el = stripRef.current;
      if (!el) return;
      const halfway = Math.round(cardStep * testimonials.length);
      const left = el.scrollLeft;
      if (dir === "left" && left < cardStep * 0.5) {
        el.classList.add("no-snap");
        el.scrollLeft = left + halfway;
        await rAF();
        el.classList.remove("no-snap");
      } else if (dir === "right" && left > halfway - cardStep * 0.5) {
        el.classList.add("no-snap");
        el.scrollLeft = left - halfway;
        await rAF();
        el.classList.remove("no-snap");
      }
    },
    [cardStep]
  );

  const handleArrow = useCallback(
    async (dir: "left" | "right") => {
      const el = stripRef.current;
      if (!el) return;
      await wrapIfNeeded(dir);
      const delta = dir === "left" ? -cardStep : cardStep;
      el.classList.add("no-snap");
      const cleanup = addScrollEndOnce(el, () => {
        el.classList.remove("no-snap");
      });
      el.scrollTo({
        left: Math.round(el.scrollLeft + delta),
        behavior: "smooth",
      });
      if (cleanup) void 0;
    },
    [cardStep, wrapIfNeeded]
  );

  const TestimonialCard = ({
    name,
    role,
    avatar,
    rating,
    quote,
    indexMarker,
  }: (typeof testimonials)[number] & { indexMarker: number }) => (
    <motion.div
      data-tcard={indexMarker}
      ref={indexMarker === 1 ? firstTCardRef : undefined}
      whileHover={{ y: -4 }}
      className="glass-card p-6 rounded-2xl min-w-[320px] max-w-[360px] relative border border-white/10"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-background">
          <img
            src={avatar}
            alt={`${name} - ${role}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground">{name}</h4>
            <div
              className="flex items-center gap-0.5"
              aria-label={`${rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < rating
                      ? "text-primary fill-current"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">“{quote}”</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ===== Hero ===== */}
      <ServicesHero />

      {/* ===== Services Coverflow ===== */}
      <section id="services-coverflow" className="pt-6 pb-10">
        <div className="container mx-auto px-6">
          <ServicesCoverflow services={allServices} onSelect={setSelected} />
        </div>
      </section>

      {/* ===== Modal (Service Details) ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="svc-dialog-title"
              aria-describedby="svc-dialog-desc"
              className="relative glass-card w-full max-w-xl rounded-2xl border border-white/10 bg-white/70 p-6 shadow-xl"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
            >
              <button
                autoFocus
                className="absolute right-3 top-3 rounded-full p-2 bg-secondary hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close dialog"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>

              <div className="flex items-start gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-orange-500 text-white">
                  <selected.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    id="svc-dialog-title"
                    className="text-xl font-bold text-muted-foreground"
                  >
                    {selected.title}
                  </h3>
                  <p
                    id="svc-dialog-desc"
                    className="text-sm text-muted-foreground mt-1"
                  >
                    {selected.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {selected.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <MotionLink
                  to="/contact"
                  whileHover={prefersReduced ? undefined : { scale: 1.04 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.96 }}
                  className="btn-primary inline-flex items-center gap-2 text-sm px-5 py-2 rounded-xl text-white"
                  aria-label="Get Started Today"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-4 h-4" />
                </MotionLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Workflow / ProcessStrip (your component) ===== */}
      <ProcessStrip />

      {/* ===== Testimonials ===== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="w-0.5 min-w-[2px] rounded-full h-4 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-7 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-9 bg-foreground/10" />
              </motion.div>

              <h2 className="font-heading font-bold tracking-tight leading-none text-[22px] sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
                What <span className="text-gradient">Our Customers</span> Say
              </h2>

              <motion.div
                initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                className="flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="w-0.5 min-w-[2px] rounded-full h-9 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-7 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-4 bg-foreground/10" />
              </motion.div>
            </div>

            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Real results from hotels, realtors, campuses, and venues using our
              virtual tours.
            </p>
          </div>

          <div className="relative pb-28">
            <div
              ref={stripRef}
              className="no-scrollbar overflow-x-auto scroll-smooth flex gap-6"
              style={{ scrollBehavior: "smooth" }}
              aria-label="Testimonials carousel"
              role="region"
              tabIndex={0}
            >
              {loopedTestimonials.map((t, i) => (
                <TestimonialCard
                  key={`${t.name}-${i}`}
                  {...t}
                  indexMarker={(i % testimonials.length) + 1}
                />
              ))}
            </div>

            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex items-center gap-5 z-10">
              <button
                aria-label="Previous"
                onClick={() => void handleArrow("left")}
                className="glass-card p-3 rounded-2xl flex items-center justify-center border-white/20 bg-gradient-to-r from-primary to-orange-500 text-white hover:opacity-90 transition"
              >
                <ChevronLeft size={23} strokeWidth={2} />
              </button>
              <button
                aria-label="Next"
                onClick={() => void handleArrow("right")}
                className="glass-card p-3 rounded-2xl flex items-center justify-center border-white/20 bg-gradient-to-r from-primary to-orange-500 text-white hover:opacity-90 transition"
              >
                <ChevronRight size={23} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-16" />
    </div>
  );
};

export default Services;
