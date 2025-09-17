import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";
import Service_BG from "../Assets/Service.jpg";
import VR_Tourism from "../Assets/VR_Tourism.jpg";
import ProcessStrip from "@/components/ProcessStrip";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const MotionLink = motion(Link);
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

/* ----------------------------- Types ----------------------------- */
type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
};

/* ----------------------------- Data ----------------------------- */
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
    features: ["Immersive 3D Experience", "Interactive Navigation", "Boosts Engagement"],
    image: VR_Tourism,
  },
  {
    id: "svc-gsv",
    icon: MapPin,
    title: "Google Street View",
    description:
      "Professional Google Street View imagery to boost your local search presence and discovery.",
    features: ["Google Standard", "SEO Benefits", "Local Discovery", "Business Listings"],
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
    features: ["Planned & compliant flights", "Cinematic paths", "5.7K Exports"],
    image: DRONE,
  },
  {
    id: "svc-360video",
    icon: Video,
    title: "360° Videography & Immersive",
    description:
      "Walk-through 360° videos with interactive hotspots, chapters, and CTAs to drive engagement and leads.",
    features: ["Stabilized Motion", "Interactive Overlays", "YouTube/Meta VR Ready"],
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

/* ----------------------------- Variants ----------------------------- */
const heroContainer: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

/* ------------------------ Helpers ------------------------ */
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const rAF = () => new Promise<void>((res) => requestAnimationFrame(() => res()));

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
};

/** Add a one-shot, typed 'scrollend' listener with a timeout fallback */
function addScrollEndOnce(
  element: HTMLElement,
  handler: (ev: Event) => void,
  timeoutMs = 600
): () => void {
  let cleaned = false;
  const eventListener: EventListener = (ev: Event) => {
    if (cleaned) return;
    cleaned = true;
    handler(ev);
  };
  element.addEventListener("scrollend", eventListener, { once: true });
  const timeoutId = window.setTimeout(() => {
    if (cleaned) return;
    cleaned = true;
    handler(new Event("scrollend"));
    element.removeEventListener("scrollend", eventListener);
  }, timeoutMs);
  return () => {
    window.clearTimeout(timeoutId);
    element.removeEventListener("scrollend", eventListener);
    cleaned = true;
  };
}

/* ------------------- Services Coverflow (Looping) ------------------- */
function ServicesCoverflow({
  services,
  onSelect,
}: {
  services: Service[];
  onSelect: (s: Service) => void;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLButtonElement | null>(null);

  const [step, setStep] = useState<number>(360);
  const [ready, setReady] = useState(false);

  // 3x list for infinite loop
  const loopedServices = useMemo(() => [...services, ...services, ...services], [services]);

  // Measure slide width + gap; set CSS vars
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!track || !card || !wrap) return;

      const slideW = card.offsetWidth;
      const cs = window.getComputedStyle(track);
      const rawGap = cs.getPropertyValue("gap") || cs.getPropertyValue("column-gap") || "0";
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

  // Initial centering, transforms, and infinite re-centering
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const third = Math.round(step * services.length);

    const updateTransforms = () => {
      if (prefersReduced) return;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const children = Array.from(el.children) as HTMLElement[];

      const info = children.map((c) => {
        const cr = c.getBoundingClientRect();
        const near =
          cr.right > rect.left - cr.width * 0.5 && cr.left < rect.right + cr.width * 0.5;
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
  }, [services.length, step, prefersReduced]);

  // Disable snap during smooth scroll; re-enable on scrollend
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
      const third = Math.round(step * services.length);
      const current = el.scrollLeft;
      const delta = dir === "left" ? -step : step;

      if (dir === "left" && current - step < third * 0.5) {
        await invisibleWrap(+third);
      } else if (dir === "right" && current + step > third * 1.5) {
        await invisibleWrap(-third);
      }

      withNoSnapDuring(() => {
        el.scrollTo({ left: Math.round(el.scrollLeft + delta), behavior: "smooth" });
      });
    },
    [invisibleWrap, services.length, step, withNoSnapDuring]
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

        /* Track */
        .cf-track {
          display: flex;
          align-items: stretch;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          overscroll-behavior-x: contain;
          padding-block: 8px;
          padding-inline: max(calc((var(--wrapW, 100%) - var(--slideW, 340px)) / 2), 16px);
        }
        .cf-track::-webkit-scrollbar { display: none; }

        /* Slide */
        .cf-slide {
          width: var(--slideW, 340px);
          aspect-ratio: 9 / 16;
          scroll-snap-align: center;
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, opacity .25s, filter .25s;
          border-radius: 28px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 10px 30px rgba(0,0,0,.08);
          contain: content;
          will-change: transform, opacity, filter;
        }
        .cf-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter: blur(0.2px); }
        .cf-overlay { position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0.0) 20%, rgba(0,0,0,.45) 100%); }

        @media (prefers-reduced-motion: reduce) {
          .cf-slide { transition: none !important; }
          .cf-track * { filter: none !important; transform: none !important; }
        }

        @media (max-width: 767px) { .cf-wrap { --slideW: 300px; } }
        @media (min-width: 768px) { .cf-wrap { --slideW: 360px; } }
      `}</style>

      <div
        ref={trackRef}
        className={`cf-track transition-opacity duration-200 ${ready ? "opacity-100" : "opacity-0"}`}
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
                  <span className="text-white font-semibold text-sm">{s.title}</span>
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

/* ----------------------------- Component ----------------------------- */
const Services = () => {
  const [selected, setSelected] = useState<Service | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Modal a11y: Escape to close + lock body scroll while open
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

  // Testimonials loop
  const stripRef = useRef<HTMLDivElement | null>(null);
  const firstTCardRef = useRef<HTMLDivElement | null>(null);
  const [cardStep, setCardStep] = useState<number>(360);

  useEffect(() => {
    const measure = () => {
      const track = stripRef.current;
      const firstCard = firstTCardRef.current;
      if (!track || !firstCard) return;

      const cardW = firstCard.offsetWidth;
      const cs = window.getComputedStyle(track);
      const rawGap = cs.getPropertyValue("gap") || cs.getPropertyValue("column-gap") || "0";
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

  const loopedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

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
      el.scrollTo({ left: Math.round(el.scrollLeft + delta), behavior: "smooth" });
      // cleanup auto-runs via scrollend or timeout
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
            <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < rating ? "text-primary fill-current" : "text-muted-foreground"}
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

        .hero-grid {
          background-image:
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* ===== Hero ===== */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        {/* Background layers (behind content) */}
        <div className="absolute inset-0 -z-10">
          {/* Base image */}
          <img
            src=""
            alt="Abstract service background"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* White overlay with slight blur */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[5px]" aria-hidden="true" />
          {/* Subtle texture */}
          <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true" />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-white"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={heroContainer}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-0 px-4">
              Comprehensive virtual tour solutions tailored to your industry needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Services Coverflow ===== */}
      <section className="py-4">
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
            {/* backdrop */}
            <motion.button
              type="button"
              aria-label="Close"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* dialog */}
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
                  <h3 id="svc-dialog-title" className="text-xl font-bold text-muted-foreground">
                    {selected.title}
                  </h3>
                  <p id="svc-dialog-desc" className="text-sm text-muted-foreground mt-1">
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

      <ProcessStrip />

      {/* ===== Testimonials ===== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
              {/* Left bars */}
              <motion.div
                initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="w-0.5 min-w-[2px] rounded-full h-3 sm:h-3.5 md:h-4 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-5 sm:h-6 md:h-7 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-7 sm:h-8 md:h-9 bg-foreground/10" />
              </motion.div>

              <h2 className="font-heading font-bold tracking-tight leading-none flex items-center text-[22px] sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground">
                <span>What&nbsp;</span>
                <span className="text-gradient">Our Customers</span>
                <span>&nbsp;Say</span>
              </h2>

              {/* Right bars */}
              <motion.div
                initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                className="flex items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="w-0.5 min-w-[2px] rounded-full h-7 sm:h-8 md:h-9 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-5 sm:h-6 md:h-7 bg-foreground/10" />
                <span className="w-0.5 min-w-[2px] rounded-full h-3 sm:h-3.5 md:h-4 bg-foreground/10" />
              </motion.div>
            </div>

            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Real results from hotels, realtors, campuses, and venues using our virtual tours.
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
                <TestimonialCard key={`${t.name}-${i}`} {...t} indexMarker={(i % testimonials.length) + 1} />
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
