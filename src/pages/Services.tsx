import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Building,
  Home,
  Store,
  MapPin,
  Zap,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

const ServicesPage = () => {
  const allServices = [
    {
      icon: Camera,
      title: "Virtual Tours",
      description:
        "Immersive 360° virtual tours that let customers explore your space from anywhere in the world.",
      features: [
        "4K Quality Recording",
        "Interactive Hotspots",
        "Mobile Friendly",
        "Custom Branding",
      ],
      price: "Starting at $299",
      popular: true,
    },
    {
      icon: MapPin,
      title: "Google Street View",
      description:
        "Professional Google Street View imagery to boost your local search presence and discovery.",
      features: [
        "Google Certified",
        "SEO Benefits",
        "Local Discovery",
        "Business Listings",
      ],
      price: "Starting at $199",
    },
    {
      icon: Building,
      title: "Commercial Spaces",
      description:
        "Showcase offices, retail spaces, and commercial properties with professional virtual tours.",
      features: [
        "Professional Lighting",
        "Brand Integration",
        "Lead Generation",
        "Analytics Dashboard",
      ],
      price: "Starting at $399",
    },
    {
      icon: Home,
      title: "Real Estate",
      description:
        "Help properties sell faster with stunning virtual walkthroughs that engage buyers.",
      features: [
        "Faster Sales",
        "Remote Viewing",
        "Premium Presentation",
        "MLS Integration",
      ],
      price: "Starting at $249",
    },
    {
      icon: Store,
      title: "Hospitality",
      description:
        "Hotels, restaurants, and venues that drive more bookings and customer engagement.",
      features: [
        "Booking Integration",
        "Virtual Concierge",
        "Enhanced Experience",
        "Social Sharing",
      ],
      price: "Starting at $349",
    },
    {
      icon: Zap,
      title: "360° Photography",
      description:
        "High-resolution 360° photography for any application or marketing platform.",
      features: [
        "HDR Processing",
        "Custom Branding",
        "Multiple Formats",
        "Print Ready",
      ],
      price: "Starting at $149",
    },
    {
      icon: Users,
      title: "Event Spaces",
      description:
        "Perfect for venues, conference centers, and event spaces to showcase their capabilities.",
      features: [
        "Event Layouts",
        "Capacity Planning",
        "Vendor Integration",
        "Booking Tools",
      ],
      price: "Starting at $299",
    },
    {
      icon: Globe,
      title: "Educational Institutions",
      description:
        "Virtual campus tours for schools, universities, and training facilities.",
      features: [
        "Campus Navigation",
        "Student Engagement",
        "Virtual Open Houses",
        "Accessibility",
      ],
      price: "Starting at $499",
    },
  ];

  const testimonials = [
    {
      name: "Priya Menon",
      role: "GM, Seascape Resort",
      avatar: "https://i.pravatar.cc/120?img=47",
      rating: 5,
      quote:
        "The virtual tour doubled our website engagement and reduced inquiry calls—guests arrive already confident about the property.",
    },
    {
      name: "Arun Kumar",
      role: "Realtor, UrbanNest Realty",
      avatar: "https://i.pravatar.cc/120?img=12",
      rating: 5,
      quote:
        "Listings with 360° walkthroughs sold faster. Buyers loved exploring remotely before shortlisting for visits.",
    },
    {
      name: "Meera Shah",
      role: "Marketing Head, Vista Hotels",
      avatar: "https://i.pravatar.cc/120?img=32",
      rating: 4,
      quote:
        "Smooth onboarding, great branding controls, and a clean analytics dashboard. Exactly what we needed.",
    },
    {
      name: "Rahul Iyer",
      role: "Admin, New Dawn College",
      avatar: "https://i.pravatar.cc/120?img=5",
      rating: 5,
      quote:
        "Virtual campus tour helped parents explore facilities in detail. It’s now part of our admissions toolkit.",
    },
    {
      name: "Anita Joseph",
      role: "Owner, Craft & Co. Studios",
      avatar: "https://i.pravatar.cc/120?img=68",
      rating: 5,
      quote:
        "Customers spend longer on our pages and convert faster—360° has been a fantastic upgrade for us.",
    },
    {
      name: "Vikas Gupta",
      role: "Venue Manager, The Grand Pavilion",
      avatar: "https://i.pravatar.cc/120?img=24",
      rating: 4,
      quote:
        "Event planners appreciated the detailed layouts and capacity views. Bookings became easier to close.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const stripRef = useRef<HTMLDivElement | null>(null);
  const [cardStep, setCardStep] = useState(360);

  useEffect(() => {
    const measure = () => {
      const el = stripRef.current;
      if (!el) return;
      const firstCard = el.querySelector(
        '[data-tcard="1"]'
      ) as HTMLElement | null;
      if (!firstCard) return;
      const styles = window.getComputedStyle(firstCard);
      const ml = parseFloat(styles.marginLeft || "0") || 0;
      const mr = parseFloat(styles.marginRight || "0") || 0;
      setCardStep(firstCard.offsetWidth + ml + mr);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, []);

  const loopedTestimonials = [...testimonials, ...testimonials];

  // Manual arrow navigation (wraps seamlessly and works reliably)
  const handleArrow = useCallback(
    (dir: "left" | "right") => {
      const el = stripRef.current;
      if (!el) return;
      const halfway = Math.floor(el.scrollWidth / 2);

      let current = Math.round(el.scrollLeft);
      if (dir === "left") {
        if (current - cardStep < 0) {
          el.scrollLeft = current + halfway;
          current = Math.round(el.scrollLeft);
        }
        el.scrollTo({ left: current - cardStep, behavior: "smooth" });
      } else {
        if (current + cardStep >= halfway) {
          el.scrollLeft = current - halfway;
          current = Math.round(el.scrollLeft);
        }
        el.scrollTo({ left: current + cardStep, behavior: "smooth" });
      }
    },
    [cardStep]
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
      whileHover={{ y: -4 }}
      className="glass-card p-6 rounded-2xl min-w-[320px] max-w-[360px] mx-3 relative border border-white/10"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-14 h-14">
          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/40 bg-background">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-foreground">{name}</h4>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < rating
                      ? "text-primary fill-current"
                      : "text-muted-foreground"
                  }
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
    <div className="min-h-screen bg-gradient-to-b pt-24">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin-slower { animation: spin 6s linear infinite; }
      `}</style>

      {/* ===== Hero ===== */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 px-4">
              Comprehensive virtual tour solutions tailored to your industry
              needs. From real estate to hospitality, we&apos;ve got you
              covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Services Grid ===== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
          >
            {allServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className={`glass-card hover:shadow-glow transition-all duration-500 group relative ${
                  service.popular ? "ring-2 ring-primary/50" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white text-sm font-bold py-1 px-4 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 transition-all duration-300">
                    <service.icon
                      size={24}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="text-muted-foreground font-bold text-lg mb-4">
                    {service.price}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-primary text-center"
                >
                  Get Quote
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h4 className="uppercase tracking-widest text-sm text-muted-foreground mb-2">
              Testimonials
            </h4>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              What <span className="text-gradient">Our Customers</span> Say
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Real results from hotels, realtors, campuses, and venues using our
              virtual tours.
            </p>
          </div>

          <div className="relative pb-28">
            <div
              ref={stripRef}
              className="no-scrollbar overflow-x-auto scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
              aria-label="Testimonials carousel"
              role="region"
              tabIndex={0}
            >
              <div className="flex items-stretch py-2 gap-6">
                {loopedTestimonials.map((t, i) => (
                  <TestimonialCard
                    key={`${t.name}-${i}`}
                    {...t}
                    indexMarker={(i % testimonials.length) + 1}
                  />
                ))}
              </div>
            </div>

            {/* Manual left/right arrows for testimonials */}
            <div className="absolute left-1/2 bottom-2 -translate-x-1/2 flex items-center gap-5 z-10">
              <button
                aria-label="Previous"
                onClick={() => handleArrow("left")}
                className="glass-card p-3 rounded-2xl flex items-center justify-center border-white/20 bg-gradient-primary text-white hover:bg-primary/80 transition"
              >
                <ChevronLeft size={23} strokeWidth={2} />
              </button>
              <button
                aria-label="Next"
                onClick={() => handleArrow("right")}
                className="glass-card p-3 rounded-2xl flex items-center justify-center border-white/20 bg-gradient-primary text-white hover:bg-primary/80 transition"
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

export default ServicesPage;
