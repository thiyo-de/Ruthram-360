// WhyChooseUs.tsx
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check, Award, Rocket, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import WSUS from "../Assets/why-choose-us.jpg";

const MotionLink = motion(Link);

type Benefit = { icon: LucideIcon; title: string; description: string };

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center rounded-xl border border-foreground/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur py-4"
    >
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
        {number}
      </div>
      <div className="text-muted-foreground text-xs sm:text-sm">{label}</div>
    </motion.div>
  );
}

const WhyChooseUs = () => {
  const benefits: Benefit[] = [
    {
      icon: Award,
      title: "Google Standard",
      description: "Street View trusted & best practices",
    },
    {
      icon: MapPin,
      title: "Blue Line GSV",
      description: "Publish connected 360° paths on Maps",
    },
    {
      icon: Camera,
      title: "8K HDR Capture",
      description: "Crisp 360° photos & video, true-to-color",
    },
    {
      icon: Rocket,
      title: "Fast Turnaround",
      description: "From capture to publish in days with clear milestones.",
    },
  ];

  const features = [
    "Blue Line Google Street View publishing",
    "HDR 360° photography (true-to-color)",
    "Interactive hotspots, branding & CTAs",
    "8K capture with web/VR-optimized delivery",
    "Drone 360° aerial video (5.7K)",
    "YouTube/Meta VR ready + basic analytics",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left — Image card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative p-3 sm:p-4 md:p-5">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <motion.img
                  src={WSUS}
                  alt="Virtual reality preview"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Floating Benefits */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-2 sm:p-3 md:p-4 text-center hover:shadow-glow transition-all duration-300"
                  title={benefit.description}
                >
                  <benefit.icon className="w-5 h-5 text-primary mx-auto mb-1.5 sm:mb-2" />
                  <h4 className="text-muted-foreground font-medium text-xs sm:text-sm">
                    {benefit.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Copy + checklist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-muted-foreground text-start mb-4 sm:mb-6">
              Why Choose <span className="text-gradient">Us</span>?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Not just photos—immersive 360° experiences that feel like a visit
              and turn searches into enquiries, bookings, and sales.
            </p>

            {/* Feature checklist */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="flex items-center space-x-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0"
                    aria-hidden
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row (small) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              <Stat number="35+" label="Tours Created" />
              <Stat number="100%" label="Client Satisfaction" />
              <Stat number="8K" label="Capture Quality" />
            </div>

            <MotionLink
              to="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
              aria-label="View Our Work"
            >
              <span>View Our Work</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MotionLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
