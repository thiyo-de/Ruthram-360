import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Logo from "../Assets/Logo.svg";

const Footer = () => {
  const location = useLocation();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer
      role="contentinfo"
      className="bg-background pt-12 sm:pt-16 pb-6 sm:pb-8"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Gradient Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-primary text-white px-6 sm:px-10 md:px-14 py-10 sm:py-14 md:py-16"
          aria-labelledby="footer-heading"
        >
          {/* Corner Logo Badge */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-20">
            <div className="size-10 sm:size-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center">
              <img
                src={Logo}
                alt="Ruthram360 brand"
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Quick Links */}
            <section aria-labelledby="footer-quicklinks">
              <h3
                id="footer-quicklinks"
                className="font-heading text-lg sm:text-xl font-semibold mb-4"
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => {
                  const active = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex items-center gap-2 transition-colors ${
                          active ? "text-white" : "text-white/90 hover:text-white"
                        }`}
                      >
                        <span
                          className="size-1.5 rounded-full bg-white/70"
                          aria-hidden="true"
                        />
                        <span className="leading-tight">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Contact */}
            <section aria-labelledby="footer-contact">
              <h3
                id="footer-contact"
                className="font-heading text-lg sm:text-xl font-semibold mb-4"
              >
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/90">
                  <Mail size={18} className="opacity-90 shrink-0 mt-0.5" aria-hidden="true" />
                  <a
                    href="mailto:mktg@ruthram360.com"
                    className="leading-tight break-words hover:text-white transition-colors"
                  >
                    mktg@ruthram360.com
                  </a>
                </li>
              </ul>
            </section>

            {/* Social Links */}
            <section aria-labelledby="footer-follow">
              <h3
                id="footer-follow"
                className="font-heading text-lg sm:text-xl font-semibold mb-4"
              >
                Follow us
              </h3>
              <ul className="flex gap-4 sm:gap-5">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="flex items-center justify-center size-10 rounded-full bg-white/15 border border-white/20 hover:bg-white/25 transition-colors"
                    >
                      <s.icon size={18} className="text-white opacity-90" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Watermark */}
          <h2
            id="footer-heading"
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 text-center select-none font-heading font-black tracking-tight leading-none text-white/10 text-[26vw] md:text-[20vw] lg:text-[18vw] bottom-[-2rem] sm:bottom-[-3rem]"
          >
            Ruthram360
          </h2>
        </motion.div>

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ruthram360. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
