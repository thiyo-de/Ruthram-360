import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Check } from "lucide-react";

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
import MTCG from "../Assets/MTCG.avif";
import PMUST from "../Assets/PMUST.jpg";
import MITCAT from "../Assets/MITCAT.jpg";
import SONACT from "../Assets/SONACT.jpg";
import KRCEPIC from "../Assets/KRCEPIC.png";
import TPC from "../Assets/TPC.jpg";

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
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(Boolean(mq?.matches));
    onChange();
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const calc = () => {
      const loopWidth = el.scrollWidth / 2; // duplicated content
      const duration = Math.max(10, Math.round(loopWidth / speedPxPerSec));
      el.style.setProperty("--marquee-duration", `${duration}s`);
    };

    const onResize = () => calc();
    window.addEventListener("resize", onResize);

    // Recalc when images load
    const imgs = Array.from(el.querySelectorAll("img"));
    const removers: Array<() => void> = [];
    imgs.forEach((img) => {
      if (img.complete) return;
      const onLoad = () => calc();
      const onError = () => calc();
      img.addEventListener("load", onLoad, { once: true });
      img.addEventListener("error", onError, { once: true });
      removers.push(() => {
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
      removers.forEach((off) => off());
    };
  }, [items, speedPxPerSec]);

  return (
    <div
      className="relative overflow-hidden"
      aria-label="Client logos carousel"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={trackRef}
        className={[
          "flex w-max gap-8 sm:gap-12 py-4",
          reduceMotion
            ? ""
            : "animate-[marquee_var(--marquee-duration)_linear_infinite] will-change-transform",
          isPaused
            ? "[animation-play-state:paused]"
            : "[animation-play-state:running]",
        ].join(" ")}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex gap-8 sm:gap-12">
            {items.map((client, i) => (
              <div key={`${client.name}-${copyIndex}-${i}`} className="w-[140px] sm:w-[160px]">
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [project, onClose]);

  if (!project) return null;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const canOpen = Boolean(project.url);

  const handleShare = async () => {
    if (!project.url) return;
    try {
      await navigator.clipboard.writeText(project.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for older browsers
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
            <h3 id="project-title" className="text-xl sm:text-2xl font-semibold">
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

          {/* Body (scrollable; scrollbar hidden) */}
          <div className="px-6 pb-6 pt-4 max-h-[80vh] overscroll-contain overflow-y-auto no-scrollbar">
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
                <h4 className="text-neutral-900 font-semibold mb-3">Key Features</h4>
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
                <div className="font-medium text-neutral-900">{project.client}</div>
              </div>
              <div>
                <div className="text-neutral-500">Completed</div>
                <div className="font-medium text-neutral-900">{project.completedDate}</div>
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

        {/* Hide scrollbar utility (scoped; no plugin required) */}
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

  const projects: Project[] = [
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
      description: "Experience Vijayarani Hotel in 360° – comfort, elegance, and modern amenities.",
      features: ["3D Experience", "Interior Navigation", "Room Tours"],
      client: "Hotel Vijayarani",
      completedDate: "March 2024",
      url: "https://example.com/vijayarani-hotel-3d-tour",
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
      title: "Periyar maniyammai Institute of Science & Technology - Virtual Tour",
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
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 13,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 14,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 15,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 16,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 17,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
     {
      id: 18,
      title: "Periyar University - Virtual Tour",
      category: "Virtual Tour",
      image: AU1,
      description:
        "Step inside Periyar University – classrooms, libraries, and vibrant campus life in 360°.",
      features: ["360 Virtual Tour", "Interactive Pano", "Aerial Views"],
      client: "Periyar University",
      completedDate: "Augest 2023",
      url: "https://www.periyaruniversity.ac.in/vtour/index.htm",
    },
  ];

  const clients: Client[] = [
    { name: "Alagappa University", logo: AU },
    { name: "Periyar University", logo: Periyar },
    { name: "Periyar Maniammai Institute of Science & Technology", logo: Periyar_Maniyammai },
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

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const VISIBLE_LIMIT = 6;
  const projectsToRender = showAll
    ? filteredProjects
    : filteredProjects.slice(0, VISIBLE_LIMIT);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background pt-24">
      {/* Hero */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 px-4">
              Explore our collection of immersive virtual experiences. Each project tells a unique
              story and showcases our commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Categories */}
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
                  className={`glass-card px-4 sm:px-6 py-3 flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-primary text-white"
                      : "text-muted-foreground hover:bg-white/10"
                  }`}
                  aria-pressed={isActive}
                >
                  <MaskIcon
                    src={category.icon}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    title={`${category.name} icon`}
                  />
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {projectsToRender.map((project, idx) => (
                <motion.div
                  key={`${project.id}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* IMAGE AREA */}
                  <div className="relative aspect-video mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://via.placeholder.com/600x400.png?text=Image";
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  {/* TEXT AREA */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gradient mb-2 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium mb-2">
                        {project.category}
                      </p>
                      <p className="text-muted-foreground/75 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground/75">
                        {project.completedDate}
                      </span>
                      <ExternalLink
                        size={16}
                        className="text-primary group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View More Button */}
          {!showAll && filteredProjects.length > VISIBLE_LIMIT && (
            <div className="flex justify-center mt-8">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAll(true)}
                className="px-6 py-3 rounded-lg bg-gradient-primary text-white font-medium"
              >
                View More
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Our Clients */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-10">
            Our Clients
          </h2>

          <Marquee
            items={clients}
            cardClass="bg-white p-4 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            speedPxPerSec={60}
          />
        </div>
      </section>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default PortfolioPage;
