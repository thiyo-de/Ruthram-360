import {
  useEffect,
  useRef,
  useState,
  useMemo,
  type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Check } from "lucide-react";
import Service_BG from "../Assets/Service.jpg";
import Blog from "@/components/blog";

/* ---------- Client Logos (replace with your assets as needed) ---------- */
import AU from "../Assets/Alagappa.png";
import Periyar from "../Assets/Periyar.png";
import Periyar_Maniyammai from "../Assets/Periyar-Maniyammai.png";
import Sona from "../Assets/Sona.png";
import TPT from "../Assets/TPT.png";
import MIET from "../Assets/miet.png";
import DSCE from "../Assets/DSCE.png";
import MIT from "../Assets/MIT.png";
import MT from "../Assets/MT.png";
import KRCT from "../Assets/KRCT.png";
import KRCE from "../Assets/KRCE.png";
import Vamsam from "../Assets/Vamsam.png";
import Sinduja from "../Assets/Sinduja.png";
import Tps from "../Assets/TPS.png";
import KH from "../Assets/KH.png";
import SMC from "../Assets/SMC.png";
import HV from "../Assets/HV.png";
import Treat from "../Assets/Treat.png";
import MSU from "../Assets/MSU.png";

/* ---------- Category Icons (as files) ---------- */
import VT from "../Assets/VT.svg";
import All from "../Assets/All.svg";
import Tour from "../Assets/3D Tour.svg"; // If your bundler dislikes spaces, rename to `3D-Tour.svg`
import GSV from "../Assets/GSV.svg";

/* ---------- Project Media ---------- */
import AU1 from "../Assets/AU.jpg";
import V_Hotel from "../Assets/Vijayrani Hotel.avif";
import MSU1 from "../Assets/MSU.jpg";
import PU from "../Assets/PU.jpg";
import MTCG from "../Assets/MTCG.webp";
import PMUST from "../Assets/PMUST.jpg";
import MITCAT from "../Assets/MITCAT.jpg";
import SONACT from "../Assets/SONACT.jpg";
import KRCEPIC from "../Assets/KRCEPIC.png";
import TPC from "../Assets/TPC.jpg";
import TREAT from "../Assets/TREAT MSME.jpg";
import KMC from "../Assets/KMC.avif";
import Sindthuja from "../Assets/Sinduja Hospital.avif";
import DSCE1 from "../Assets/DSCE1.jpeg";
import Vamsam_Hospital from "../Assets/Vamsam Hospital.avif";
import Mount_Zion from "../Assets/Mount Zion.jpg";
import SKMC from "../Assets/SKMC.jpg";
import TPS1 from "../Assets/TPS1.avif";
import TPS2 from "../Assets/TPS2.avif";
import AU_Museum from "../Assets/Vallal Dr. Alagappar Museum.jpg";
import Anandam from "../Assets/anadam.png";
import Chola from "../Assets/Chola.png";
import KRCE1 from "../Assets/KRCE1.jpg";
import KRCT1 from "../Assets/krct1.jpeg";
import MIET1 from "../Assets/MIET1.jpg";
import MG1 from "../Assets/MG.png";
import MITP from "../Assets/MITP.jpg";
import PMP from "../Assets/PMP.jpg";
import Shankar from "../Assets/Shankar.png";
import SVPS from "../Assets/SVPS.jpg";
import VN from "../Assets/VN.jpg";

/* -------------------- Types -------------------- */
type Category = "All" | "Virtual Tour" | "3D Tour" | "Google Street View";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  description: string;
  features: string[];
  client: string;
  completedDate: string;
  url?: string; // project link
}

interface Client {
  name: string;
  logo: string;
}

/* -------------------- MaskIcon -------------------- */
const MaskIcon = ({
  src,
  className = "",
  title,
}: {
  src: string;
  className?: string;
  title?: string;
}) => {
  const style: CSSProperties = {
    backgroundColor: "currentColor",
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    display: "inline-block",
  };
  return (
    <span
      aria-hidden={!title}
      role={title ? "img" : undefined}
      title={title}
      className={className}
      style={style}
    />
  );
};

/* -------------------- Marquee (Clients) -------------------- */
type MarqueeItem = { name: string; logo: string };

const Marquee = ({
  items,
  cardClass = "",
  speedPxPerSec = 60,
}: {
  items: MarqueeItem[];
  cardClass?: string;
  speedPxPerSec?: number;
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const set = () => setReduceMotion(Boolean(mq?.matches));
    set();
    mq?.addEventListener?.("change", set);
    return () => mq?.removeEventListener?.("change", set);
  }, []);

  // Compute duration from content width
  useEffect(() => {
    if (!trackRef.current) return;

    const el = trackRef.current;
    const calc = () => {
      // Because we duplicate content, half of scrollWidth is one full loop
      const loopWidth = el.scrollWidth / 2;
      const durationSec = Math.max(10, Math.round(loopWidth / speedPxPerSec));
      el.style.setProperty("--marquee-duration", `${durationSec}s`);
    };

    // Recalc on resize and when images load
    const onResize = () => calc();
    window.addEventListener("resize", onResize);

    const imgs = Array.from(el.querySelectorAll("img"));
    const unsubs: Array<() => void> = [];
    imgs.forEach((img) => {
      if (img.complete) return;
      const onLoad = () => calc();
      const onError = () => calc();
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onError, { once: true });
      unsubs.push(() => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onError);
      });
    });

    const ro = new ResizeObserver(() => calc());
    ro.observe(el);

    calc();
    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      unsubs.forEach((u) => u());
    };
  }, [items, speedPxPerSec]);

  // Touch toggle for pause (since :hover is unreliable on mobile)
  const handleTouchToggle = () => setIsPaused((p) => !p);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      aria-label="Client logos carousel"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchToggle}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      {/* When reduced motion is requested, turn off animation and allow manual scroll */}
      <div
        ref={trackRef}
        className={[
          "flex w-max gap-8 sm:gap-12 py-4",
          reduceMotion ? "overflow-x-auto no-scrollbar" : "",
        ].join(" ")}
        style={
          reduceMotion
            ? undefined
            : {
                animation: `marquee var(--marquee-duration) linear infinite`,
                animationPlayState: isPaused ? "paused" : "running",
                willChange: "transform",
              }
        }
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-8 sm:gap-12">
            {items.map((client, i) => (
              <div
                key={`${client.name}-${copy}-${i}`}
                className="w-[140px] sm:w-[160px]"
              >
                <div className={`rounded-2xl ${cardClass}`}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="h-12 sm:h-14 w-auto object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://via.placeholder.com/150x60.png?text=LOGO";
                    }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Keyframes (translate3d for GPU) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
/* -------------------- Project Modal (WHITE bg, NO shadow, modern) -------------------- */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  /* Lock body, esc to close, and focus scroll region so trackpad/keys work */
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    const t = setTimeout(() => {
      scrollRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [project, onClose]);

  /* Route wheel/touch to the modal (no-explicit-any safe) */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel: EventListener = (ev) => {
      const e = ev as WheelEvent;
      const canScroll =
        el.scrollHeight > el.clientHeight &&
        ((e.deltaY < 0 && el.scrollTop > 0) ||
          (e.deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight));

      if (canScroll) {
        e.preventDefault();
        el.scrollTop += e.deltaY;
      }
    };

    let startY = 0;
    const onTouchStart: EventListener = (ev) => {
      const e = ev as TouchEvent;
      startY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove: EventListener = (ev) => {
      const e = ev as TouchEvent;
      const currentY = e.touches[0]?.clientY ?? 0;
      const deltaY = startY - currentY;

      const canScroll =
        el.scrollHeight > el.clientHeight &&
        ((deltaY < 0 && el.scrollTop > 0) ||
          (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight));

      if (!canScroll) {
        e.preventDefault(); // stop background/bounce scroll
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [project]);

  if (!project) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const canOpen = Boolean(project.url);

  const handleShare = async () => {
    if (!project?.url) return;
    try {
      await navigator.clipboard.writeText(project.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = project.url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-3xl rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-none"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
          animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
          exit={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          tabIndex={-1}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5">
            <h3
              id="project-title"
              className="text-xl sm:text-2xl font-semibold"
            >
              {project.title}
            </h3>
            <button
              type="button"
              ref={closeRef}
              aria-label="Close"
              onClick={onClose}
              className="rounded-full p-1 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body (scrollable; trackpad/touch friendly) */}
          <div
            ref={scrollRef}
            className="px-6 pb-6 pt-4 max-h-[80vh] overflow-y-auto no-scrollbar focus:outline-none"
            tabIndex={0}
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              touchAction: "pan-y",
            }}
          >
            <div className="relative overflow-hidden rounded-xl mb-5 aspect-video border border-neutral-200 bg-neutral-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/1200x675.png?text=Preview";
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            </div>

            <p className="text-sm text-neutral-600">{project.description}</p>

            {project.features?.length ? (
              <div className="mt-5">
                <h4 className="text-neutral-900 font-semibold mb-3">
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((f, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 text-sm text-neutral-700 rounded-full border border-neutral-200 bg-neutral-100"
                    >
                      • {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-neutral-500">Client</div>
                <div className="font-medium text-neutral-900">
                  {project.client}
                </div>
              </div>
              <div>
                <div className="text-neutral-500">Completed</div>
                <div className="font-medium text-neutral-900">
                  {project.completedDate}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              {canOpen ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-primary text-white font-medium hover:opacity-95"
                >
                  View Project
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-200 text-neutral-500 font-medium cursor-not-allowed"
                >
                  View Project
                </button>
              )}
              <button
                type="button"
                onClick={handleShare}
                disabled={!canOpen}
                className={`px-5 py-3 rounded-lg border font-medium ${
                  canOpen
                    ? "border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200"
                    : "border-neutral-100 bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Share Link
              </button>
            </div>
          </div>
        </motion.div>

        {/* Toast: Link Copied */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="fixed bottom-6 right-6 z-[100000] rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" />
                <span>Link copied</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* local utility */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

/* -------------------- Page -------------------- */
const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // reset "view more" when category changes
    setShowAll(false);
  }, [selectedCategory]);

  const categories: { name: Category; icon: string }[] = [
    { name: "All", icon: All },
    { name: "Virtual Tour", icon: VT },
    { name: "3D Tour", icon: Tour },
    { name: "Google Street View", icon: GSV },
  ];

  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        title: "Alagappa University - Virtual Tour",
        category: "Virtual Tour",
        image: AU1,
        description:
          "Prestigious Alagappa University – a hub of excellence with world-class facilities and vibrant campus life.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Alagappa University",
        completedDate: "November 2024",
        url: "https://alagappauniversity.ac.in/virtual-tour/Alagappa_University_Campus/index.htm",
      },
      {
        id: 2,
        title: "Vijayarani Hotel - 3D Tour",
        category: "3D Tour",
        image: V_Hotel,
        description:
          "Experience Vijayarani Hotel in 360° – comfort, elegance, and modern amenities.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Hotel Vijayarani",
        completedDate: "March 2024",
        url: "https://my.treedis.com/tour/hotel-vijayarani",
      },
      {
        id: 3,
        title: "Alagappa University - GSV",
        category: "Google Street View",
        image: AU1,
        description:
          "Renowned Alagappa University – sprawling campus with lush greenery and state-of-the-art facilities.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Alagappa University",
        completedDate: "November 2024",
        url: "https://maps.app.goo.gl/c1xzFwsRtzaZUttZ8",
      },
      {
        id: 4,
        title: "Manonmaniam Sundaranar University - Virtual Tour",
        category: "Virtual Tour",
        image: MSU1,
        description:
          "Explore Manonmaniam Sundaranar University campus with our immersive Virtual Tour.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Manonmaniam Sundaranar University",
        completedDate: "March 2024",
        url: "https://msuniv.ac.in/Virtual_Tour/Manonmaniam_Sundaranar_University/MSU/index.htm",
      },
      {
        id: 5,
        title: "Periyar University - Virtual Tour",
        category: "Virtual Tour",
        image: PU,
        description:
          "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Periyar University",
        completedDate: "Augest 2023",
        url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
      },
      {
        id: 6,
        title: "Mother Teresa Group of Institutions - Virtual Tour",
        category: "Virtual Tour",
        image: MTCG,
        description:
          "Experience the academic spirit and modern facilities of Mother Teresa Group of Institutions in 3D Virtual Tour",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Mother Teresa Group of Institutions",
        completedDate: "May 2023",
        url: "https://www.motherterasakalvi.com/virtualtour/motherterasa/MTC/index.htm",
      },
      {
        id: 7,
        title:
          "Periyar maniyammai Institute of Science & Technology - Virtual Tour",
        category: "Virtual Tour",
        image: PMUST,
        description:
          "Periyar Maniyammai Institute of Science & Technology – Immersive 3D Campus Tour.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Periyar Maniammai Institute of Science & Technology",
        completedDate: "Augest 2023",
        url: "https://uandi.media/Virtual-tour/Periyar_Maniammai/index.htm",
      },
      {
        id: 8,
        title: "MIT Agriculture & Technology - Virtual Tour",
        category: "Virtual Tour",
        image: MITCAT,
        description:
          "Virtual Tour of MIT Agriculture & Technology – Innovation Meets Education.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "MIT Agriculture & Technology",
        completedDate: "December 2023",
        url: "https://tour.mitcat.ac.in/",
      },
      {
        id: 9,
        title: "Sona College of Technology - Virtual Tour",
        category: "Virtual Tour",
        image: SONACT,
        description:
          "Step inside our vibrant campus, explore classrooms, labs, and student life in 360°.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "SONA College of Technology",
        completedDate: "May 2024",
        url: "https://www.sonatech.ac.in/campus-360-virtual-tour/Aerialview/",
      },
      {
        id: 10,
        title: "K Ramakrishnan College of Engineering - Virtual Tour",
        category: "Virtual Tour",
        image: KRCEPIC,
        description:
          "Explore our state-of-the-art campus, academic blocks, and vibrant student life in 360°.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "K Ramakrishnan College of Engineering",
        completedDate: "December 2022",
        url: "https://uandi.media/Virtual-tour/KRCE/index.htm",
      },
      {
        id: 11,
        title: "Thiagarajar Polytechnic College - Virtual Tour",
        category: "Virtual Tour",
        image: TPC,
        description:
          "From workshops to hostels, explore your future campus anytime, anywhere.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Thiagarajar Polytechnic College",
        completedDate: "May 2024",
        url: "https://tpt.edu.in/campus-360-virtual-tour/TPT_Aerialview/index.htm",
      },
      {
        id: 12,
        title: "Treat MSME - Virtual Tour",
        category: "Virtual Tour",
        image: TREAT,
        description:
          "From forging to fabrication, experience industry-ready spaces with advanced machinery and hands-on training.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Treat MSME",
        completedDate: "Augest 2022",
        url: "https://uandi.media/Virtual-tour/treat/index.htm",
      },
      {
        id: 13,
        title: "Kauvery Hospital - Virtual Tour",
        category: "Virtual Tour",
        image: KMC,
        description:
          "Discover cutting-edge medical technology, specialized departments, and a healing environment.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Kauvery Hospital",
        completedDate: "May 2022",
        url: "https://uandi.media/Virtual-tour/KMC/index.htm",
      },
      {
        id: 14,
        title: "Sinduja Hospital - Virtual Tour",
        category: "Virtual Tour",
        image: Sindthuja,
        description:
          "Explore patient care facilities, advanced treatment units, and modern healthcare services in 360°.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Sinduja Hospital",
        completedDate: "Feb 2022",
        url: "https://uandi.media/Virtual-tour/sindujahospital/index.htm",
      },
      {
        id: 15,
        title: "DSCE - Virtual Tour",
        category: "Virtual Tour",
        image: DSCE1,
        description:
          "From lecture halls to hostels, explore your future campus anytime, anywhere.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "DSCE",
        completedDate: "June 2024",
        url: "https://dsce.ac.in/CAMPUSTOUR/DSCE/",
      },
      {
        id: 16,
        title: "Vamsam Hospital & Fertility Research Centre - Virtual Tour",
        category: "Virtual Tour",
        image: Vamsam_Hospital,
        description:
          "Explore world-class fertility care, advanced treatment units, and patient-friendly facilities in 360°.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Vamasm Hospital & Fertility Research Centre",
        completedDate: "October 2023",
        url: "https://uandi.media/Virtual-tour/vamsamfertilitycentre/index.htm",
      },
      {
        id: 17,
        title: "Mount Zion International School - Virtual Tour",
        category: "Virtual Tour",
        image: Mount_Zion,
        description:
          "Discover global education standards, interactive learning spaces, and student-friendly facilities.",
        features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
        client: "Mount Zion International School",
        completedDate: "March 2023",
        url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
      },
      {
        id: 18,
        title: "MIT College of Agriculture & Technology - 3D Tour",
        category: "3D Tour",
        image: MITCAT,
        description:
          "Explore modern classrooms, research labs, and green agricultural spaces in 360°.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "MITCAT",
        completedDate: "April 2023",
        url: "https://my.treedis.com/tour/mit-agriculture",
      },
      {
        id: 19,
        title: "Periyar Robotics & Al Lab - 3D Tour",
        category: "3D Tour",
        image: PMUST,
        description:
          "Explore cutting-edge robotics, artificial intelligence research, and innovation hubs in 360°",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Periyar University",
        completedDate: "September 2023",
        url: "https://my.treedis.com/tour/roboticslab",
      },
      {
        id: 20,
        title: "Srikamatchi Medical Center - 3D Tour",
        category: "3D Tour",
        image: SKMC,
        description:
          "Explore advanced healthcare facilities, treatment units, and patient care spaces in 360°.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Sri Kamakshi Medical Centre",
        completedDate: "June 2023",
        url: "https://my.treedis.com/tour/srikamatchi-medical-center",
      },
      {
        id: 21,
        title: "SONA College of Technology - 3D Tour",
        category: "3D Tour",
        image: SONACT,
        description:
          "From lecture halls to hostels, experience every corner of our campus anytime, anywhere.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "SONA College of Technology",
        completedDate: "March 2024",
        url: "https://my.treedis.com/tour/sona-college",
      },
      {
        id: 22,
        title: "Tiruchy Public School, Kattur - 3D Tour",
        category: "3D Tour",
        image: TPS1,
        description:
          "From academics to activities, experience a vibrant and nurturing campus anytime, anywhere.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Tiruchy Public School",
        completedDate: "January 2023",
        url: "https://my.treedis.com/tour/tps-kattur",
      },
      {
        id: 23,
        title: "Tiruchy Public School, Thuvakudi - 3D Tour",
        category: "3D Tour",
        image: TPS2,
        description:
          "From academics to activities, experience a vibrant and nurturing campus anytime, anywhere.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Tiruchy Public School",
        completedDate: "January 2023",
        url: "https://my.treedis.com/tour/tps-thuvakudi",
      },
      {
        id: 24,
        title: "Vallal Dr. Alagappar Museum - 3D Tour",
        category: "3D Tour",
        image: AU_Museum,
        description:
          "From historic artifacts to cultural treasures, experience the museum anytime, anywhere.",
        features: ["3D Experience", "Interior Navigation", "Room Tours"],
        client: "Alagappa University",
        completedDate: "October 2024",
        url: "https://my.matterport.com/show/?m=vV7Bv9Sk4wT",
      },
      {
        id: 25,
        title: "Anandam Nagar - GSV",
        category: "Google Street View",
        image: Anandam,
        description:
          "Discover local life, streetscapes, and nearby hotspots in an immersive walkthrough.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Anandam Nagar",
        completedDate: "September 2024",
        url: "https://maps.app.goo.gl/3tLUg4KezmWM1QjA9",
      },
      {
        id: 26,
        title: "Chola City - GSV",
        category: "Google Street View",
        image: Chola,
        description:
          "From properties to local streets, explore every corner of Chola City anytime, anywhere.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Chola City",
        completedDate: "May 2023",
        url: "https://maps.app.goo.gl/kJBRVHkV1ZMhzM8H9",
      },
      {
        id: 27,
        title: "K Ramakrishnan College of Engineering - GSV",
        category: "Google Street View",
        image: KRCE1,
        description:
          "Discover academic blocks, labs, and student spaces with easy navigation.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "K Ramakrishnan College of Engineering",
        completedDate: "June 2022",
        url: "https://maps.app.goo.gl/21t61TbLswQjac3Y6",
      },
      {
        id: 28,
        title: "K Ramakrishnan College of Technology - GSV",
        category: "Google Street View",
        image: KRCT1,
        description:
          "Explore classrooms, labs, libraries, and campus facilities in immersive 360° street view.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "K Ramakrishnan College of Technology",
        completedDate: "June 2022",
        url: "https://maps.app.goo.gl/oVH17FpjD6BoUSnR8",
      },
      {
        id: 29,
        title: "MIET Engineering College - GSV",
        category: "Google Street View",
        image: MIET1,
        description:
          "From lecture halls to hostels, explore the campus anytime, anywhere in 360°",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "MIET Engineering College",
        completedDate: "October 2024",
        url: "https://maps.app.goo.gl/dfsD5PZQAJYmBf1N8",
      },
      {
        id: 30,
        title: "MG - Properties - GSV",
        category: "Google Street View",
        image: MG1,
        description:
          "Explore residential and commercial properties, streets, and amenities in immersive 360°",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "MG - Properties",
        completedDate: "Augest 2021",
        url: "https://maps.app.goo.gl/A456e2NTDy8fSfRk8",
      },
      {
        id: 31,
        title: "MIT Polytechnic College - GSV",
        category: "Google Street View",
        image: MITP,
        description:
          "Discover academic blocks, innovation spaces, and student amenities with easy navigation.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "MIT Polytechnic College",
        completedDate: "October 2020",
        url: "https://maps.app.goo.gl/or2ELiLj1Vp6USZh6",
      },
      {
        id: 32,
        title: "Mother Teresa Group of Institutions - GSV",
        category: "Google Street View",
        image: MTCG,
        description:
          "Explore classrooms, labs, libraries, and campus facilities in immersive 360° street view.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Mother Teresa Group of Institutions",
        completedDate: "May 2023",
        url: "https://maps.app.goo.gl/wAt3WufmJrtUjrPz9",
      },
      {
        id: 33,
        title: "Periyar University - GSV",
        category: "Google Street View",
        image: PU,
        description:
          "From lecture halls to hostels, explore the vibrant campus anytime, anywhere in 360°",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "periyar University",
        completedDate: "December 2021",
        url: "https://maps.app.goo.gl/8Wgep3vsqWY17qFr8",
      },
      {
        id: 34,
        title: "Periyar Memorial - GSV",
        category: "Google Street View",
        image: PMP,
        description:
          "Walk through historic galleries, exhibits, and cultural landmarks in immersive 360°",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Periyar University",
        completedDate: "February 2021",
        url: "https://maps.app.goo.gl/UyVNvFA1CiAtQi7NA",
      },
      {
        id: 35,
        title: "Shankar Nagar - GSV",
        category: "Google Street View",
        image: Shankar,
        description:
          "Discover residential areas, local amenities, and community spaces with easy navigation.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Shankar Nagar",
        completedDate: "October 2021",
        url: "https://maps.app.goo.gl/Ps9s5Hte3BMSrW7NA",
      },
      {
        id: 36,
        title: "Sri Vignesh Public School - GSV",
        category: "Google Street View",
        image: SVPS,
        description:
          "Explore classrooms, labs, libraries, and campus facilities in immersive 360° street view.",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Sri Vignesh Public School",
        completedDate: "January 2023",
        url: "https://maps.app.goo.gl/M38uTANkYQKVCMCn7",
      },
      {
        id: 37,
        title: "Vistancia Namakkal - GSV",
        category: "Google Street View",
        image: VN,
        description:
          "From classrooms to playgrounds, experience the vibrant campus anytime, anywhere in 360°",
        features: ["Layer View", "Smooth Nav", "Live Track"],
        client: "Vistancia Namakkal",
        completedDate: "November 2022",
        url: "https://maps.app.goo.gl/CwgBjBF67AcFgtzD8",
      },
    ],
    []
  );

  const clients: Client[] = [
    { name: "Alagappa University", logo: AU },
    { name: "Periyar University", logo: Periyar },
    {
      name: "Periyar Maniammai Institute of Science & Technology",
      logo: Periyar_Maniyammai,
    },
    { name: "Sona College of Technology", logo: Sona },
    { name: "TPT Polytechnic College", logo: TPT },
    { name: "MIET Institutions", logo: MIET },
    { name: "DSCE", logo: DSCE },
    { name: "MIT Institutions", logo: MIT },
    { name: "Mother Teresa Group of Institutions", logo: MT },
    { name: "KRCT", logo: KRCT },
    { name: "KRCE", logo: KRCE },
    { name: "Vamsam Fertility Research Centre", logo: Vamsam },
    { name: "Sinduja Hospital", logo: Sinduja },
    { name: "Trichy Public School", logo: Tps },
    { name: "Kauvery Hospital", logo: KH },
    { name: "Sri Kamakshi Medical Centre", logo: SMC },
    { name: "Hotel Vijayarani", logo: HV },
    { name: "Treat MSME", logo: Treat },
    { name: "Manonmaniam Sundaranar University", logo: MSU },
  ];

  function shuffleArray<T>(array: T[]): T[] {
    // Fisher-Yates shuffle
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Shuffle only once per mount/category change, not on every render
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (selectedCategory === "All") {
      setShuffledProjects(shuffleArray(projects));
    }
  }, [selectedCategory, projects]);

  const filteredProjects =
    selectedCategory === "All"
      ? shuffledProjects
      : projects.filter((p) => p.category === selectedCategory);

  const VISIBLE_LIMIT = 6;
  const projectsToRender = !showAll
    ? filteredProjects.slice(0, VISIBLE_LIMIT)
    : filteredProjects;

  const hasMore = filteredProjects.length > VISIBLE_LIMIT;

  return (
    <div className="min-h-screen">
      {/* Hero */}

      <section className="relative pt-48 sm:pt-44 md:pt-48 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        {/* Local CSS for the grid texture (denser + higher contrast) */}
        <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Local CSS for the hero grid texture */
        .hero-grid {
          background-image:
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

        {/* Background layers (behind content) */}
        <div className="absolute inset-0 -z-10">
          {/* Base image (use any; this one is just to validate contrast) */}
          <img
            src=""
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          {/* Theme-aware overlay with slight blur */}
          <div
            className="absolute inset-0 bg-background/75 backdrop-blur-[5px]"
            style={{ willChange: "filter" }}
          />

          {/* Subtle grid texture (now stronger/denser) */}
          <div className="absolute inset-0 z-0 hero-grid pointer-events-none" />

          {/* Bottom fade (theme-aware) */}
          <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-muted-foreground mb-6 px-4">
              <span className="inline-block md:whitespace-nowrap">
                Our <span className="text-gradient">Portfolio</span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-0 px-4">
              Explore our collection of immersive virtual experiences. Each
              project tells a unique story and showcases our commitment to
              excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* === Filter Categories === */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <motion.button
                  key={category.name}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full flex items-center gap-2 text-sm sm:text-base font-medium transition-all duration-300 
              ${
                isActive
                  ? "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md"
                  : "border border-neutral-300 text-muted-foreground bg-white hover:border-primary/50"
              }`}
                  aria-pressed={isActive}
                >
                  <MaskIcon
                    src={category.icon}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isActive ? "text-white" : "text-muted-foreground"
                    }`}
                  />
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* === Portfolio Grid (Cards) === */}
      {/* === Portfolio Grid (Cards) === */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {projectsToRender.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {/* Background image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

                  {/* Card content */}
                  <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end h-full text-white">
                    <h3 className="text-base sm:text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/90 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Badge row */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/15 border border-white/25 backdrop-blur-sm">
                        {project.client}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs bg-white/15 border border-white/25">
                        {project.completedDate}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs bg-gradient-to-r from-primary to-orange-500 text-white shadow">
                        {project.category}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 flex justify-end">
                      <span className="px-3 py-1.5 text-xs rounded-full bg-white text-neutral-900 font-medium shadow group-hover:shadow-lg transition">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Enforce uniform height */}
                  <div className="invisible">
                    <div className="aspect-[4/3]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View more / Show less button */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                className={`px-6 py-3 rounded-full font-medium transition
            ${
              showAll
                ? "border border-neutral-300 text-muted-foreground bg-white hover:border-primary/50"
                : "bg-gradient-to-r from-primary to-orange-500 text-white shadow-md"
            }`}
              >
                {showAll ? "Show Less" : "View More"}
              </motion.button>
            </div>
          )}
        </div>
      </section>

      <Blog />

      {/* Our Clients */}
      {/* === Clients Section === */}

      {/* === Clients Section (Testimonial Logos) === */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-4xl text-muted-foreground">
              Trusted By{" "}
              <span className="text-gradient">Leading Institutions</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground/80">
              (Tip: Tap once on mobile to pause / resume)
            </p>
          </div>

          <Marquee
            items={clients}
            cardClass="bg-white p-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md rounded-lg"
            speedPxPerSec={60}
          />
        </div>
      </section>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default PortfolioPage;
