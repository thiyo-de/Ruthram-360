import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Assets/Logo.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'backdrop-blur-md border-b border-gray-200 bg-[hsl(var(--background))] lg:bg-transparent'
            : 'bg-[hsl(var(--background))] lg:bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center"
              >
                <img src={Logo} alt="Logo" />
              </motion.div>
              {/* Smaller on sm/md, larger on lg */}
              <span className="font-semibold text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl">
                Ruthram360°
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative transition-all duration-300 font-medium group text-sm sm:text-base md:text-lg ${
                      active ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-primary transition-all duration-300 ${
                        active ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button & Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary hidden xl:flex items-center space-x-2"
              >
                <Calendar size={20} />
                <span>Book Appointment</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen((s) => !s)}
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className={`fixed top-16 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
              isScrolled
                ? 'bg-[hsl(var(--background))] backdrop-blur-md border-b border-gray-200'
                : 'bg-[hsl(var(--background))]'
            }`}
          >
            <div className="flex flex-col items-center py-8 space-y-6">
              {navLinks.map((link, index) => {
                const active = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`font-light transition-all duration-300 relative group text-base sm:text-lg md:text-xl ${
                        active ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-gradient-primary rounded-full transition-all duration-300 ${
                          active ? 'w-8' : 'w-0 group-hover:w-6'
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 w-full px-6">
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary flex items-center space-x-2 w-full justify-center"
                >
                  <Calendar size={20} />
                  <span>Book Appointment</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
