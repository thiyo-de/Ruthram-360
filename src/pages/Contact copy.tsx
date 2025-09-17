import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  User,
  Building,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

/** Same-origin endpoint. In dev the Vite proxy forwards to your PHP. */
const SEND_ENDPOINT = `/api/send-email.php`;

/* ── Click-outside hook ───────────────────────────────────────── */
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onOutside]);
  return ref;
}

/* ── Custom white dropdown ────────────────────────────────────── */
function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>(() =>
    value
      ? Math.max(
          0,
          options.findIndex((o) => o === value)
        )
      : 0
  );
  const wrapRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLLIElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const commit = (index: number) => {
    const v = options[index];
    if (!v) return;
    onChange({ target: { name, value: v } });
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(active);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 pr-10 text-left outline-none focus:border-primary transition"
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-2xl overflow-hidden"
        >
          <li
            role="option"
            aria-selected={!value}
            className="px-3 py-2 text-sm text-gray-700 bg-gray-50 cursor-default"
          >
            {placeholder}
          </li>
          {options.map((opt, i) => {
            const selected = opt === value;
            const activeRow = i === active;
            return (
              <li
                key={opt}
                data-index={i}
                role="option"
                aria-selected={selected}
                className={`px-3 py-2 text-sm cursor-pointer select-none
                            ${
                              selected
                                ? "text-gray-900 font-medium"
                                : "text-gray-700"
                            }
                            ${activeRow ? "bg-gray-100" : "hover:bg-gray-50"}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => commit(i)}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

type ApiResponse = { ok: boolean; error?: string };

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project: "",
    message: "",
    website: "", // honeypot – keep field name in PHP too
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(SEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const raw = await res.text(); // safe parse
      let data: ApiResponse | null = null;
      if (raw) {
        try {
          data = JSON.parse(raw) as ApiResponse;
        } catch {
          /* non-JSON body */
        }
      }

      if (!res.ok || !data || !data.ok) {
        const msg =
          data?.error || (raw && raw.slice(0, 200)) || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        project: "",
        message: "",
        website: "",
      });
      setTimeout(() => setIsSubmitted(false), 3500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const contactInfo: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    link: string;
  }> = [
    {
      icon: Mail,
      label: "Email Us",
      value: "mktg@ruthram360.com",
      link: "mailto:mktg@ruthram360.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon–Sat: 9AM–6PM",
      link: "#",
    },
  ];

  const services = [
    "Virtual Tours",
    "360 Degree 3D Tour",
    "Google Street View",
    "360° Photography",
    "360° Aerial Video (Drone)",
    "360° Videography & Immersive",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Local CSS for the hero grid texture */
        .hero-grid {
          background-image:
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* ===== Hero (matches Services/About) ===== */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        {/* Local CSS for the grid texture (kept inside this page) */}

        {/* Background layers */}
        <div className="absolute inset-0 -z-10">
          {/* Base image (optional—swap Contact_BG to any image; or remove if not needed) */}
          <img
            src=""
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          {/* White overlay with slight blur */}
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[6px]" />

          {/* Subtle grid texture */}
          <div className="absolute inset-0 hero-grid pointer-events-none" />

          {/* Bottom fade (same height as other pages) */}
          <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 max-w-3xl mx-auto mb-12 px-4">
              Ready to transform your space with immersive virtual experiences?
              Let’s discuss your project and create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: info */}
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
                  project, we're here to help.
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
                    className="glass-card p-6 flex items-start space-x-4 hover:shadow-glow transition-all duration-300 group"
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
              <div className="space-y-4">
                <motion.a
                  href="https://wa.me/919345258381?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20call."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} className="text-white" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right: form */}
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

                {error && (
                  <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <User size={16} className="inline mr-2" /> Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Mail size={16} className="inline mr-2" /> Email Address
                        *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Phone size={16} className="inline mr-2" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                        placeholder="+91 12345 67890"
                      />
                    </div>

                    <div>
                      <label className="block text-muted-foreground font-medium mb-2">
                        <Building size={16} className="inline mr-2" />{" "}
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">
                      Service Needed
                    </label>
                    <CustomSelect
                      id="service"
                      name="service"
                      value={formData.service}
                      options={[
                        "Virtual Tours",
                        "360 Degree 3D Tour",
                        "Google Street View",
                        "360° Photography",
                        "360° Aerial Video (Drone)",
                        "360° Videography & Immersive",
                      ]}
                      placeholder="Select a service"
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
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
                      className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                      placeholder="e.g., Real estate listing, restaurant showcase, office tour"
                    />
                  </div>

                  <div>
                    <label className="block text-muted-foreground font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition resize-none"
                      placeholder="Tell us more about your project, timeline, specific requirements, or any questions you have..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: sending ? 1 : 1.02 }}
                    whileTap={{ scale: sending ? 1 : 0.98 }}
                    disabled={sending}
                    className="w-full btn-primary disabled:opacity-70 flex items-center justify-center space-x-2 relative overflow-hidden"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>{sending ? "Sending..." : "Send Message"}</span>
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
    </div>
  );
};

export default ContactPage;
