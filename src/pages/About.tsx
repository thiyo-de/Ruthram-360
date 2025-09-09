import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Camera, 
  Globe, 
  CheckCircle, 
  Target,
  Heart,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '500+', label: 'Projects Completed', icon: CheckCircle },
    { number: '98%', label: 'Client Satisfaction', icon: Heart },
    { number: '5+', label: 'Years Experience', icon: Award },
    { number: '50+', label: 'Cities Covered', icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every detail matters. We use cutting-edge technology to capture spaces with perfect accuracy and stunning visual quality.'
    },
    {
      icon: Zap,
      title: 'Innovation', 
      description: 'We stay ahead of the curve, constantly adopting new technologies and techniques to deliver the best possible results.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do. Our passion for visual storytelling drives us to exceed expectations on every project.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Your success is our success. We work closely with clients to understand their needs and deliver tailored solutions.'
    }
  ];

  const certifications = [
    'Google Street View Trusted Photographer',
    'Matterport Service Partner',
    'RICOH Theta Certified Professional',
    'Real Estate Photography Association Member'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6">
              About <span className="text-gradient">Vision360</span>
            </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We're not just photographers - we're visual storytellers who transform 
                spaces into immersive experiences that captivate, engage, and convert.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Founded in 2019, Vision360 has grown from a small photography studio 
                into a leading provider of virtual tour solutions, serving clients 
                across industries from real estate to hospitality.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-muted-foreground text-sm">Happy Clients</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-muted-foreground text-sm">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-muted-foreground text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-6">
                  <Camera size={120} className="text-white/60" />
                </div>
                <h3 className="text-2xl font-bold text-muted-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To revolutionize how businesses showcase their spaces through 
                  cutting-edge virtual tour technology, creating immersive experiences 
                  that drive engagement and results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card text-center hover:shadow-glow transition-all duration-300"
              >
                <stat.icon size={45} className="text-primary mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-muted-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="glass-card hover:shadow-glow transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-muted-foreground mb-4">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-6">
                <span className="text-gradient">Certified</span> Excellence
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our team holds industry-leading certifications, ensuring you receive 
                the highest quality service and cutting-edge expertise.
              </p>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Award size={16} className="text-white" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      {cert}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                <div className="glass-card bg-white p-6">
                  <Globe size={48} className="text-primary mb-4" />
                  <h3 className="text-lg font-bold text-muted-foreground mb-2">Global Reach</h3>
                  <p className="text-muted-foreground text-sm">
                    Serving clients worldwide with consistent quality
                  </p>
                </div>
                <div className="glass-card bg-white p-6">
                  <Zap size={48} className="text-primary mb-4" />
                  <h3 className="text-lg font-bold text-muted-foreground mb-2">Fast Delivery</h3>
                  <p className="text-muted-foreground text-sm">
                    48-hour turnaround on most projects
                  </p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="glass-card bg-white p-6">
                  <Users size={48} className="text-primary mb-4" />
                  <h3 className="text-lg font-bold text-muted-foreground mb-2">Expert Team</h3>
                  <p className="text-muted-foreground text-sm">
                    Certified professionals with years of experience
                  </p>
                </div>
                <div className="glass-card bg-white p-6">
                  <CheckCircle size={48} className="text-primary mb-4" />
                  <h3 className="text-lg font-bold text-muted-foreground mb-2">Guaranteed</h3>
                  <p className="text-muted-foreground text-sm">
                    100% satisfaction guarantee on all work
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together. 
              Our team is ready to bring your vision to life.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Get In Touch</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;