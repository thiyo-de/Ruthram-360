import { motion } from "framer-motion";
import {
  BadgeCheck,
  Users,
  Images,
  CheckCircle,
  Target,
  Heart,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import About_us from "../Assets/About.jpg";
import About_us_img from "../Assets/About_us.jpg";

const MotionLink = motion(Link);
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const AboutPage = () => {
  const stats = [
    { number: "35+", label: "Projects Completed", icon: CheckCircle },
    { number: "100%", label: "Client Satisfaction", icon: Heart },
    { number: "5+", label: "Years Experience", icon: BadgeCheck },
    { number: "8K", label: "Capture Quality", icon: Images },
  ] as const;

  const values = [
    {
      icon: Target,
      title: "Precision",
      description:
        "Every detail matters. We use cutting-edge technology to capture spaces with perfect accuracy and stunning visual quality.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We stay ahead of the curve, constantly adopting new technologies and techniques to deliver the best possible results.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We love what we do. Our passion for visual storytelling drives us to exceed expectations on every project.",
    },
    {
      icon: Users,
      title: "Partnership",
      description:
        "Your success is our success. We work closely with clients to understand their needs and deliver tailored solutions.",
    },
  ] as const;

  const certifications = [
    "Google Street View Trusted Photographer",
    "Matterport Service Partner",
    "RICOH Theta Certified Professional",
    "Real Estate Photography Association Member",
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <section
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden
             pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16"
        aria-labelledby="about-hero-title"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${About_us})` }}
          aria-hidden
        />

        {/* Blur + soft white veil + subtle blobs */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
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

        {/* Dot texture like Services */}
        <div
          className="absolute inset-0 -z-10 md:opacity-30 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='%23cccccc' fill-opacity='0.4'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />

        {/* Content INSIDE the banner */}
        <div className="relative z-10 w-full px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[900px]"
          >
            {/* eyebrow */}
            <span
              className="inline-flex mb-2 items-center gap-2 rounded-full px-3 py-1 text-xs font-medium 
                       bg-black/5 text-muted-foreground ring-1 ring-foreground/10 backdrop-blur"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              About
            </span>

            {/* headline */}
            <h1 id="about-hero-title" className="sr-only">
              About Ruthram360
            </h1>
            <div className="mb-4 sm:mb-6">
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-muted-foreground">
                About{" "}
              </span>
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-gradient">
                Ruthram360
              </span>
            </div>

            {/* subcopy */}
            <p className="mx-auto max-w-[42rem] text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              We’re visual storytellers—turning spaces into immersive
              experiences that captivate, engage, and convert. Founded in 2019,
              we’ve grown into a leading virtual tour partner across education,
              real estate, hospitality, and more.
            </p>
          </motion.div>
        </div>

        {/* Bottom fade into the page */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-96 z-0
               bg-gradient-to-b from-transparent via-white/55 to-white"
          aria-hidden
        />
      </section>

      <section className="pt-10 sm:pt-12 pb-14">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 group">
            <img
              src={About_us_img}
              alt="About Ruthram360"
              className="w-full h-[340px] sm:h-[420px] md:h-[480px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>

          {/* Mission card (unchanged) */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div
              className="rounded-2xl px-6 py-6 text-center ring-1 ring-black/5 bg-white/80 backdrop-blur-md
                   shadow-[0_1px_0_0_rgba(255,255,255,.6)_inset,0_12px_24px_-12px_rgba(0,0,0,.15)]"
              style={{
                backgroundImage:
                  "radial-gradient(120% 140% at 10% 0%, rgba(255,255,255,.9) 0%, rgba(255,255,255,.75) 60%, rgba(255,255,255,.65) 100%)",
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-muted-foreground">
                Our Mission
              </h3>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed">
                To revolutionize how businesses showcase their spaces through
                cutting-edge virtual tour technology, creating immersive
                experiences that drive engagement and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: EASE }}
                whileHover={{ scale: 1.05 }}
                className="glass-card text-center rounded-2xl p-4 sm:p-5 hover:shadow-glow transition-all duration-300"
              >
                <stat.icon
                  size={40}
                  className="text-primary mx-auto mb-3 sm:mb-4"
                />
                <div className="text-2xl md:text-3xl font-bold text-muted-foreground mb-1.5 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10 md:mb-12"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
              </motion.div>

              <h2 className="font-heading font-bold tracking-tight leading-none text-[22px] sm:text-4xl md:text-5xl text-muted-foreground">
                Our <span className="text-gradient">Values</span>
              </h2>

              <motion.div
                initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
              </motion.div>
            </div>

            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8"
            style={{ perspective: 1000 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: EASE,
                }}
                whileHover={{ scale: 1.02, rotateY: 6, y: -2 }}
                className="glass-card hover:shadow-glow transition-all duration-500 text-center rounded-2xl p-5 sm:p-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 bg-gradient-primary shadow-sm">
                  <value.icon size={28} className="sm:size-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-muted-foreground mb-2.5">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Certifications ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 md:mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                  aria-hidden="true"
                >
                  <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground">
                  <span className="text-gradient">Certified</span> Excellence
                </h2>

                <motion.div
                  initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                  aria-hidden="true"
                >
                  <span className="block w-0.5 min-w-[2px] h-7 sm:h-8 md:h-9 bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-5 sm:h-6 md:h-7 bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-3 sm:h-3.5 md:h-4 bg-foreground/10 rounded-full" />
                </motion.div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                Our team holds industry-leading certifications, ensuring you
                receive the highest quality service and cutting-edge expertise.
              </p>

              <ul className="space-y-3 md:space-y-4 max-w-xl mx-auto lg:mx-0">
                {certifications.map((cert, index) => (
                  <motion.li
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 ring-4 ring-white/60 dark:ring-background/60 shadow-sm">
                      <BadgeCheck size={16} className="text-white" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {cert}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              style={{ perspective: 1000 }}
            >
              <div className="space-y-5 sm:space-y-6">
                <motion.div
                  whileHover={{ y: -4, rotateX: 1.5, rotateY: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Images size={48} className="text-primary mb-3.5 sm:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-1.5">
                    Global Reach
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Serving clients worldwide with consistent quality
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, rotateX: 1.5, rotateY: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Zap size={48} className="text-primary mb-3.5 sm:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-1.5">
                    Fast Delivery
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    48-hour turnaround on most projects
                  </p>
                </motion.div>
              </div>

              <div className="space-y-5 sm:space-y-6 sm:mt-8">
                <motion.div
                  whileHover={{ y: -4, rotateX: 1.5, rotateY: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Users size={48} className="text-primary mb-3.5 sm:mb-4" />
                  <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-1.5">
                    Expert Team
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Certified professionals with years of experience
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -4, rotateX: 1.5, rotateY: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <CheckCircle
                    size={48}
                    className="text-primary mb-3.5 sm:mb-4"
                  />
                  <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-1.5">
                    Guaranteed
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    100% satisfaction guarantee on all work
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gradient mb-4 md:mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together.
              Our team is ready to bring your vision to life.
            </p>
            <MotionLink
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Get In Touch</span>
              <motion.span
                aria-hidden="true"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </MotionLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
