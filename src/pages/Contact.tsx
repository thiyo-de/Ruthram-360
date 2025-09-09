import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar,
  User,
  Building,
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project: "",
    budget: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hello@vision360.com",
      link: "mailto:hello@vision360.com",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "123 Business Ave, City, State 12345",
      link: "#",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon-Fri: 9AM-6PM, Weekends: 10AM-4PM",
      link: "#",
    },
  ];

  const services = [
    "Virtual Tours",
    "Google Street View",
    "Real Estate Photography",
    "360° Photography",
    "Commercial Spaces",
    "Hospitality Tours",
    "Custom Solution",
  ];

  const budgetRanges = [
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "$10,000+",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b pt-24">
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 px-4">
              Ready to transform your space with immersive virtual experiences?
              Let's discuss your project and create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Let's Start a Conversation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you need a quick quote or want to discuss a complex
                  project, we're here to help. Reach out using any of the
                  methods below.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="glass-card p-6 flex items-start space-x-4 hover:shadow-glow transition-all duration-300 group block"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-muted-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
                        {info.label}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Calendar size={20} />
                  <span>Schedule a Call</span>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glass w-full flex items-center justify-center space-x-2"
                >
                  <MessageSquare size={20} />
                  <span>Live Chat</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-muted-foreground mb-6">
                  Tell Us About Your Project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <User size={16} className="inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-muted-foreground/75 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Phone size={16} className="inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Building size={16} className="inline mr-2" />
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-muted-foreground/75 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option
                            key={service}
                            value={service}
                            className="bg-gray-900"
                          >
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-muted-foreground/75 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option
                            key={range}
                            value={range}
                            className="bg-gray-900"
                          >
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">
                      Project Type
                    </label>
                    <input
                      type="text"
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all"
                      placeholder="e.g., Real estate listing, restaurant showcase, office tour"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full bg-white/5 border border-gray-200 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                      placeholder="Tell us more about your project, timeline, specific requirements, or any questions you have..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center space-x-2 relative overflow-hidden"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <CheckCircle
                      size={16}
                      className="inline mr-2 text-primary"
                    />
                    We typically respond within 2 hours during business hours.
                    For urgent requests, please call us directly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-purple-600/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground mb-6">
              Visit Our <span className="text-gradient">Studio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of the city, our studio is equipped with the
              latest technology for virtual tour production.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card overflow-hidden"
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="text-white/60 mx-auto mb-4" />
                <p className="text-white text-lg">
                  Interactive Map Coming Soon
                </p>
                <p className="text-muted-foreground">
                  123 Business Ave, City, State 12345
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
