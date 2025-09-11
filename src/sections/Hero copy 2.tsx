import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const words = [
    "Premium",
    "Virtual",
    "Tours",
    "&",
    "Google",
    "Street",
    "View",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background (now light) */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Main Headline */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mb-4">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-8xl font-black text-center ${
                    ["Premium", "Virtual"].includes(word)
                      ? "text-gradient" // uses orange gradient from your index.css
                      : "text-muted-foreground" // was text-white
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Transform your business with immersive 360° experiences.
            Professional virtual tours that showcase your space like never
            before.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={wordVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              <span>Get Started Today</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4"
            >
              <Play size={18} className="sm:w-5 sm:h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 px-4"
          >
            {[
              { number: "500+", label: "Tours Created" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={wordVariants}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-card text-center hover:scale-105 transition-transform duration-300 p-4 sm:p-6"
                style={{ backgroundColor: "#F5F7F9" }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

  {/* Scroll Indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
  className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    className="w-6 h-10 border-2 rounded-full flex justify-center items-start border-[hsl(var(--foreground)_/_0.25)]"
  >
    <motion.div
      animate={{ y: [0, 18, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      className="w-1 h-3 bg-primary rounded-full mt-1"
    />
  </motion.div>
</motion.div>

    </section>
  );
};

export default Hero;
