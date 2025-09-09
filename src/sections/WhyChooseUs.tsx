import { motion } from 'framer-motion';
import { Check, Award, Clock, Headphones, Shield, Lightbulb } from 'lucide-react';

const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Award,
      title: 'Google Certified',
      description: 'Official Google Street View trusted photographers'
    },
    {
      icon: Clock,
      title: '48-Hour Delivery',
      description: 'Fast turnaround without compromising quality'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and technical support'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee or full refund'
    },
    {
      icon: Lightbulb,
      title: 'Latest Technology',
      description: 'Cutting-edge cameras and software for best results'
    }
  ];

  const features = [
    'Professional 4K 360° cameras',
    'HDR processing for perfect lighting',
    'Interactive hotspots and information',
    'Mobile-optimized viewing experience',
    'SEO optimization for better visibility',
    'Custom branding and integration'
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative glass-card p-8">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-2" />
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                See Our Process in Action
              </h3>
              <p className="text-muted-foreground">
                Watch how we create stunning virtual tours that transform the way 
                customers experience your business.
              </p>
            </div>

            {/* Floating Benefits */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
              {benefits.slice(0, 4).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-2 sm:p-3 md:p-4 text-center hover:shadow-glow transition-all duration-300"
                >
                  <benefit.icon size={16} className="sm:w-5 sm:h-5 text-primary mx-auto mb-1 sm:mb-2" />
                  <h4 className="text-muted-foreground font-medium text-xs sm:text-sm">{benefit.title}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-muted-foreground text-center mb-4 sm:mb-6">
              Why Choose <span className="text-gradient">Vision360</span>?
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              We're not just photographers - we're visual storytellers who help 
              businesses create powerful first impressions and drive real results.
            </p>

            {/* Feature Checklist */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
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

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {[
                { number: '500+', label: 'Projects' },
                { number: '98%', label: 'Satisfaction' },
                { number: '48hrs', label: 'Delivery' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>View Our Work</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;