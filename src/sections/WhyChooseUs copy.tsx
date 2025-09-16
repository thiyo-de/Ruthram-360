import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Award,
  Headphones,
  Shield,
  Lightbulb,
  MapPin,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";
import WSUS from '../Assets/why-choose-us.jpg'

const MotionLink = motion(Link);

type Benefit = { icon: LucideIcon; title: string; description: string };

const WhyChooseUs = () => {
  /* --- Short, reference-aligned benefits --- */
  const benefits: Benefit[] = [
    {
      icon: Award,
      title: "Google Certified",
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
      icon: Headphones,
      title: "24/7 Support",
      description: "Fast help & proactive updates",
    },
  ];

  /* --- Pulled from your 360° services --- */
  const features = [
    "Blue Line Google Street View publishing",
    "HDR 360° photography (true-to-color)",
    "Interactive hotspots, branding & CTAs",
    "8K capture with web/VR-optimized delivery",
    "Drone 360° aerial video (5.7K/8K)",
    "YouTube/Meta VR ready + basic analytics",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side — Image card (replaces video) */}
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
                  transition={{ delay: index * 0.1, duration: 0.6 }}
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

          {/* Right Side — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-muted-foreground text-center mb-4 sm:mb-6">
              Why Choose <span className="text-gradient">Ruthram360°</span>?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Not just photos—immersive 360° experiences that make discovery
              feel like a visit and turn searches into enquiries, bookings, and
              sales.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="flex items-center space-x-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats Row — matches your reference */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {[
                { number: "35+", label: "Tours Created" },
                { number: "100%", label: "Client Satisfaction" },
                { number: "8K", label: "Capture Quality" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center glass-card py-4"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <MotionLink
              to="/portfolio" // ✅ client-side navigation
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
