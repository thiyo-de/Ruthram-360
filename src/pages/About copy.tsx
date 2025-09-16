import { motion } from "framer-motion";
import {
  BadgeCheck,
  Users,
  ArrowRight,
  Images,
  CheckCircle,
  Target,
  Heart,
  Zap,
} from "lucide-react";
import About_us from "../Assets/About_us.jpg";
import { Link } from "react-router-dom";
const MotionLink = motion(Link);

const AboutPage = () => {
  const stats = [
    { number: "35+", label: "Projects Completed", icon: CheckCircle },
    { number: "100%", label: "Client Satisfaction", icon: Heart },
    { number: "5+", label: "Years Experience", icon: BadgeCheck },
    { number: "8K", label: "Capture Quality", icon: Images },
  ];

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
  ];

  const certifications = [
    "Google Street View Trusted Photographer",
    "Matterport Service Partner",
    "RICOH Theta Certified Professional",
    "Real Estate Photography Association Member",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-4 md:mb-6 leading-[1.1]">
                About <span className="text-gradient">Ruthram360</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                We're not just photographers - we're visual storytellers who
                transform spaces into immersive experiences that captivate,
                engage, and convert.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10">
                Founded in 2019, Ruthram360 has grown from a small photography
                studio into a leading provider of virtual tour solutions,
                serving clients across industries from real estate to
                hospitality.
              </p>
              <div className="flex items-center gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    100+
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Happy Clients
                  </div>
                </div>
                <div className="w-px h-10 md:h-12 bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    5+
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Years Experience
                  </div>
                </div>
                <div className="w-px h-10 md:h-12 bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    100%
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Satisfaction Rate
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-6 sm:p-7 md:p-8 rounded-2xl">
                <div className="aspect-[5/4] rounded-2xl overflow-hidden mb-5 sm:mb-6 shadow-lg">
                  <img
                    src={About_us}
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-muted-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  To revolutionize how businesses showcase their spaces through
                  cutting-edge virtual tour technology, creating immersive
                  experiences that drive engagement and results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
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

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 md:mb-12"
          >
            {/* Bars + Title (unchanged style) */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="block w-0.5 min-w-[2px] h-3  sm:h-3.5 md:h-4  bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-5  sm:h-6   md:h-7  bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-7  sm:h-8   md:h-9  bg-foreground/10 rounded-full" />
              </motion.div>

              <h2 className="font-heading font-bold tracking-tight leading-none text-[22px] sm:text-4xl md:text-5xl text-muted-foreground">
                Our <span className="text-gradient">Values</span>
              </h2>

              <motion.div
                initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                aria-hidden="true"
              >
                <span className="block w-0.5 min-w-[2px] h-7  sm:h-8   md:h-9  bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-5  sm:h-6   md:h-7  bg-foreground/10 rounded-full" />
                <span className="block w-0.5 min-w-[2px] h-3  sm:h-3.5 md:h-4  bg-foreground/10 rounded-full" />
              </motion.div>
            </div>

            <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          {/* Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8"
            style={{ perspective: 1000 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.02, rotateY: 6, y: -2 }}
                className="glass-card hover:shadow-glow transition-all duration-500 text-center rounded-2xl p-5 sm:p-6"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 sm:mb-6 bg-gradient-primary shadow-sm">
                  <value.icon
                    size={28}
                    className="sm:size-8 text-white"
                    aria-hidden="true"
                  />
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

      {/* Certifications Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left: Copy + Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              {/* Bars + Title */}
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 md:mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -12, scaleY: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                  aria-hidden="true"
                >
                  <span className="block w-0.5 min-w-[2px] h-3  sm:h-3.5 md:h-4  bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-5  sm:h-6   md:h-7  bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-7  sm:h-8   md:h-9  bg-foreground/10 rounded-full" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-bold text-muted-foreground">
                  <span className="text-gradient">Certified</span> Excellence
                </h2>

                <motion.div
                  initial={{ opacity: 0, x: 12, scaleY: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2"
                  aria-hidden="true"
                >
                  <span className="block w-0.5 min-w-[2px] h-7  sm:h-8   md:h-9  bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-5  sm:h-6   md:h-7  bg-foreground/10 rounded-full" />
                  <span className="block w-0.5 min-w-[2px] h-3  sm:h-3.5 md:h-4  bg-foreground/10 rounded-full" />
                </motion.div>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0">
                Our team holds industry-leading certifications, ensuring you
                receive the highest quality service and cutting-edge expertise.
              </p>

              <ul className="space-y-3 md:space-y-4 max-w-xl mx-auto lg:mx-0">
                {certifications.map((cert, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 ring-4 ring-white/60 dark:ring-background/60 shadow-sm">
                      <BadgeCheck
                        size={16}
                        className="text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {cert}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
              style={{ perspective: 1000 }}
            >
              <div className="space-y-5 sm:space-y-6">
                <motion.div
                  whileHover={{ y: -4, rotateX: 1.5, rotateY: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Images
                    size={48}
                    className="text-primary mb-3.5 sm:mb-4"
                    aria-hidden="true"
                  />
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
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Zap
                    size={48}
                    className="text-primary mb-3.5 sm:mb-4"
                    aria-hidden="true"
                  />
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
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Users
                    size={48}
                    className="text-primary mb-3.5 sm:mb-4"
                    aria-hidden="true"
                  />
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
                  className="glass-card bg-white p-5 sm:p-6 rounded-2xl bg-card text-card-foreground ring-1 ring-border shadow-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <CheckCircle
                    size={48}
                    className="text-primary mb-3.5 sm:mb-4"
                    aria-hidden="true"
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

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
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
              <motion.div
                aria-hidden="true"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </MotionLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
