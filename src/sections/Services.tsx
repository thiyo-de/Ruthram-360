import { motion } from 'framer-motion';
import { Camera, Building, Home, Store, MapPin, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Virtual Tours',
      description: 'Immersive 360° virtual tours that let customers explore your space from anywhere.',
      features: ['4K Quality', 'Interactive Hotspots', 'Mobile Friendly'],
    },
    {
      icon: MapPin,
      title: 'Google Street View',
      description: 'Professional Google Street View imagery to boost your local search presence.',
      features: ['Google Certified', 'SEO Benefits', 'Local Discovery'],
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Showcase offices, retail spaces, and commercial properties professionally.',
      features: ['Professional Lighting', 'Brand Integration', 'Lead Generation'],
    },
    {
      icon: Home,
      title: 'Real Estate',
      description: 'Help properties sell faster with stunning virtual walkthroughs.',
      features: ['Faster Sales', 'Remote Viewing', 'Premium Presentation'],
    },
    {
      icon: Store,
      title: 'Hospitality',
      description: 'Hotels, restaurants, and venues that drive more bookings.',
      features: ['Booking Integration', 'Virtual Concierge', 'Enhanced Experience'],
    },
    {
      icon: Zap,
      title: '360° Photography',
      description: 'High-resolution 360° photography for any application or platform.',
      features: ['HDR Processing', 'Custom Branding', 'Multiple Formats'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b scroll-mt-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-muted-foreground mb-4 sm:mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive virtual tour solutions tailored to your industry and needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
              }}
              className="glass-card hover:shadow-glow transition-all duration-500 group"
            >
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300">
                  <service.icon size={24} className="sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                className="mt-6 text-primary font-medium hover:text-primary-glow transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;