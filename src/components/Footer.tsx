import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import Logo from "../Assets/Logo.svg";

const Footer = () => {
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
    <footer className="bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Orange Card (no shadow) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[24px] sm:rounded-[28px] md:rounded-[36px]
                     bg-gradient-primary text-white px-6 sm:px-10 md:px-14
                     py-10 sm:py-14 md:py-16"
          aria-labelledby="footer-heading"
        >
          {/* Corner brand badge */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-20">
            <div
              className="size-10 sm:size-12 rounded-2xl bg-white/15 border border-white/20
                            backdrop-blur-sm flex items-center justify-center"
            >
              {/* If your SVG is already white, remove the filter classes below */}
              <img
                src={Logo}
                alt="Ruthram360 brand"
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Content grid (extra top margin so it doesn't crowd the badge) */}
          <div className="relative z-10 mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-14">
            {/* Quick Links */}
            <section aria-labelledby="footer-quicklinks">
              <h3
                id="footer-quicklinks"
                className="font-heading text-lg sm:text-xl font-semibold mb-4"
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    >
                      <span className="size-1.5 rounded-full bg-white/70" />
                      <span className="leading-tight">{link.name}</span>
                    </Link>
                  </li>
                ))}
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
                  <Mail size={18} className="opacity-90 shrink-0 mt-0.5" />
                  <span className="leading-tight break-words">
                    mktg@ruthram360.com
                  </span>
                </li>
              </ul>
            </section>

            {/* Follow us */}
            <section aria-labelledby="footer-follow">
              <h3
                id="footer-follow"
                className="font-heading text-lg sm:text-xl font-semibold mb-4"
              >
                Follow us
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      aria-label={s.label}
                    >
                      <s.icon size={18} className="opacity-90" />
                      <span className="leading-tight">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Big watermark (clipped inside the rounded card) */}
          <h2
            id="footer-heading"
            aria-hidden
            className="pointer-events-none absolute inset-x-0 text-center select-none
                       font-heading font-black tracking-tight leading-none text-white/10
                       text-[28vw] md:text-[20vw] lg:text-[18vw]
                       bottom-[-3rem] sm:bottom-[-4rem] md:bottom-[-5rem]"
          >
            Ruthram360
          </h2>
        </motion.div>

        {/* Bottom meta row */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Ruthram360. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
