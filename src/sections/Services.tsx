import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Camera, Globe, Compass, Route, Video } from "lucide-react";

/* ---------- Animations (typed) ---------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springTransition },
};

/* ---------- Reusable Section Title ---------- */
type SectionTitleProps = {
  prefix?: string; // e.g., "Our"
  highlight: string; // e.g., "Services" or "Benefits"
  className?: string;
};

const SectionTitle = ({
  prefix,
  highlight,
  className = "",
}: SectionTitleProps) => {
  return (
    <div className={`text-center ${className ?? ""}`}>
      <div className="flex items-center justify-center gap-3">
        {/* Left triple bars */}
        <motion.div
          initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
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

        {/* Heading */}
        <h2 className="font-heading font-bold tracking-tight leading-none flex items-center text-[22px] sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
          {prefix ? (
            <span className="mr-2 text-muted-foreground">{prefix}</span>
          ) : null}
          <span className="text-gradient">{highlight}</span>
        </h2>

        {/* Right triple bars */}
        <motion.div
          initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
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

      <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-2 leading-relaxed">
        Comprehensive virtual tour solutions tailored to your industry and needs
      </p>
    </div>
  );
};

/* ---------- Types ---------- */
type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

/* ---------- Services Section ---------- */
const Services = () => {
  const services: Service[] = [
    {
      icon: Camera,
      title: "Virtual Tours",
      description:
        "Immersive 360° virtual tours that let customers explore your space from anywhere.",
      features: ["8K Quality", "Interactive Hotspots", "All Devices Friendly"],
    },
    {
      icon: Compass,
      title: "360 Degree 3D Tour",
      description:
        "Immersive 360° 3D virtual tours that allow your audience to explore spaces interactively with a real sense of presence.",
      features: [
        "Immersive 3D Experience",
        "Interactive Navigation",
        "Boosts Engagement",
      ],
    },
    {
      icon: Route,
      title: "Google Street View",
      description:
        "Professional Google Street View imagery to boost your local search presence.",
      features: ["Google Certified", "SEO Benefits", "Local Discovery"],
    },
    {
      icon: Camera,
      title: "360° Photography",
      description:
        "Crystal-clear HDR 360° stills for interiors & exteriors—perfect for websites, Google profiles, and VR tours.",
      features: ["HDR Processing", "Branding Overlays", "Web/VR Optimized"],
    },
    {
      icon: Globe,
      title: "360° Aerial Video (Drone)",
      description:
        "Showcase scale, routes, and surroundings with breathtaking overhead 360° motion footage.",
      features: [
        "Planned & compliant flights",
        "Cinematic paths",
        "5.7K/8K Exports",
      ],
    },
    {
      icon: Video,
      title: "360° Videography & Immersive",
      description:
        "Walk-through 360° videos with interactive hotspots, chapters, and CTAs to drive engagement and leads.",
      features: [
        "Stabilized Motion",
        "Interactive Overlays",
        "YouTube/Meta VR Ready",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="py-20 sm:py-24 bg-background scroll-mt-20"
    >
      <div className="container mx-auto px-6">
        <SectionTitle
          prefix="Our"
          highlight="Services"
          className="mb-12 sm:mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {services.map((service, idx) => (
            <motion.article
              key={`${service.title}-${idx}`}
              variants={itemVariants}
              whileHover={{ scale: 1.03, translateY: -2 }}
              transition={springTransition}
              className="glass-card hover:shadow-soft transition-all duration-300 group rounded-2xl p-6"
            >
              <div className="mb-4 sm:mb-6">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 bg-primary/5"
                  aria-hidden
                >
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-muted-foreground mb-1.5 sm:mb-2 leading-tight">
                  {service.title}
                </h3>

                <p className="font-satoshi text-muted-foreground/80 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li
                    key={`${service.title}-f-${i}`}
                    className="flex items-center gap-2"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
