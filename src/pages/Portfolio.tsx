import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Camera,
  Building,
  Home,
  Store,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

/* -------------------- Types -------------------- */
type Category = "All" | "Real Estate" | "Commercial" | "Retail" | "Hospitality" | "Street View";

interface Project {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  description: string;
  features: string[];
  client: string;
  completedDate: string;
}

interface Client {
  name: string;
  logo: string;
}

/* -------------------- Marquee (Clients) -------------------- */
type MarqueeItem = { name: string; logo: string };

const Marquee = ({
  items,
  cardClass = "",
  speedPxPerSec = 60, // Adjust speed here (lower = slower, higher = faster)
}: {
  items: MarqueeItem[];
  cardClass?: string;
  speedPxPerSec?: number;
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handle = () => setReduceMotion(Boolean(mq?.matches));
    handle();
    mq?.addEventListener?.("change", handle);
    return () => mq?.removeEventListener?.("change", handle);
  }, []);

  // Auto compute duration based on content width (half of duplicated track = one cycle)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const loopWidth = el.scrollWidth / 2; // because we render two copies for seamlessness
    const duration = Math.max(10, Math.round(loopWidth / speedPxPerSec)); // seconds
    el.style.setProperty("--marquee-duration", `${duration}s`);
  }, [items, speedPxPerSec]);

  return (
    <div
      className="relative overflow-hidden"
      aria-label="Client logos carousel"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />

      {/* Track */}
      <div
        ref={trackRef}
        className={[
          "flex w-max gap-8 sm:gap-12 py-4",
          reduceMotion ? "" : "animate-[marquee_var(--marquee-duration)_linear_infinite] will-change-transform",
          isPaused ? "[animation-play-state:paused]" : "[animation-play-state:running]",
        ].join(" ")}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="flex gap-8 sm:gap-12">
            {items.map((client, i) => (
              <div key={`${client.name}-${copyIndex}-${i}`} className="w-[140px] sm:w-[160px]">
                <div className={`rounded-2xl shadow-sm ${cardClass}`}>
                  <img
                    src={client.logo}
                    alt={client.name}
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

      {/* Local keyframes (no global CSS needed) */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/* -------------------- Page -------------------- */
const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // reserved for future modal

  const categories: { name: Category; icon: LucideIcon }[] = [
    { name: "All", icon: Camera },
    { name: "Real Estate", icon: Home },
    { name: "Commercial", icon: Building },
    { name: "Retail", icon: Store },
    { name: "Hospitality", icon: Users },
    { name: "Street View", icon: MapPin },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "Luxury Downtown Penthouse",
      category: "Real Estate",
      image: "/api/placeholder/600/400",
      description: "Stunning 3-bedroom penthouse with city views and modern amenities.",
      features: ["4K Virtual Tour", "Interactive Floor Plan", "360° Balcony Views"],
      client: "Premium Properties LLC",
      completedDate: "March 2024",
    },
    {
      id: 2,
      title: "Modern Office Complex",
      category: "Commercial",
      image: "/api/placeholder/600/400",
      description: "State-of-the-art office building with collaborative workspaces.",
      features: ["Google Street View", "Interior Navigation", "Meeting Room Tours"],
      client: "TechCorp Industries",
      completedDate: "February 2024",
    },
    {
      id: 3,
      title: "Boutique Fashion Store",
      category: "Retail",
      image: "/api/placeholder/600/400",
      description: "High-end fashion boutique with immersive shopping experience.",
      features: ["Product Hotspots", "Virtual Shopping", "Brand Integration"],
      client: "Elite Fashion House",
      completedDate: "January 2024",
    },
    {
      id: 4,
      title: "Five-Star Resort & Spa",
      category: "Hospitality",
      image: "/api/placeholder/600/400",
      description: "Luxury resort showcasing amenities and beautiful landscapes.",
      features: ["Pool & Spa Tours", "Room Showcases", "Dining Experiences"],
      client: "Paradise Resort Group",
      completedDate: "December 2023",
    },
    {
      id: 5,
      title: "Historic Downtown District",
      category: "Street View",
      image: "/api/placeholder/600/400",
      description: "Complete Google Street View coverage of historic shopping district.",
      features: ["360° Street Coverage", "Business Integration", "Tourist Navigation"],
      client: "City Tourism Board",
      completedDate: "November 2023",
    },
    {
      id: 6,
      title: "Suburban Family Home",
      category: "Real Estate",
      image: "/api/placeholder/600/400",
      description: "Beautiful family home with spacious rooms and backyard.",
      features: ["Virtual Walkthrough", "Garden Tour", "Neighborhood Views"],
      client: "Sunshine Realty",
      completedDate: "October 2023",
    },
    {
      id: 7,
      title: "Tech Startup Office",
      category: "Commercial",
      image: "/api/placeholder/600/400",
      description: "Creative workspace designed for innovation and collaboration.",
      features: ["Open Space Tours", "Creative Zones", "Amenity Showcase"],
      client: "InnovateTech Solutions",
      completedDate: "September 2023",
    },
    {
      id: 8,
      title: "Artisan Coffee Shop",
      category: "Retail",
      image: "/api/placeholder/600/400",
      description: "Cozy coffee shop with artisanal atmosphere and local art.",
      features: ["Ambient Experience", "Menu Integration", "Local Art Gallery"],
      client: "Bean There Café",
      completedDate: "August 2023",
    },
  ];

  const clients: Client[] = [
    { name: "Premium Properties LLC", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "TechCorp Industries", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg" },
    { name: "Elite Fashion House", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" },
    { name: "Paradise Resort Group", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
    { name: "City Tourism Board", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg" },
    { name: "Sunshine Realty", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
    { name: "InnovateTech Solutions", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Typescript-logo.png" },
    { name: "Bean There Café", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" },
  ];

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24">
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
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`glass-card text-muted-foreground px-4 sm:px-6 py-3 flex items-center space-x-2 transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-gradient-primary text-white"
                    : "hover:bg-white/10"
                }`}
                aria-pressed={selectedCategory === category.name}
              >
                <category.icon size={20} />
                <span className="font-medium">{category.name}</span>
              </motion.button>
            ))}
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
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 mb-6 rounded-lg overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center"
                    >
                      <Camera size={48} className="text-white/60" />
                    </motion.div>
                  </div>

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
        </div>
      </section>

      {/* Our Clients (ENDLESS, SCROLLBAR-FREE) */}
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
    </div>
  );
};

export default PortfolioPage;
