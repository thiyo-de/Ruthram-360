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
  Copy,
  Check as CheckMini,
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

/* ── Custom white dropdown (keeps your white style) ──────────── */
function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
}: {
  id: string;
  name: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  onBlur?: () => void;
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
    onBlur?.();
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
        onBlur={() => !open && onBlur?.()}
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
                  ${selected ? "text-gray-900 font-medium" : "text-gray-700"}
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

/* ── Types & validation ──────────────────────────────────────── */
type ApiResponse = { ok: boolean; error?: string };

type FormDataShape = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  project: string;
  message: string;
  website: string; // honeypot
};
type Touched = Partial<Record<keyof FormDataShape, boolean>>;
type Errors = Partial<Record<keyof FormDataShape, string>>;

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRx = /^[0-9+\-\s()]{7,}$/;

/* ── Component ──────────────────────────────────────────────── */
const ContactPage = () => {
  const [formData, setFormData] = useState<FormDataShape>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    project: "",
    message: "",
    website: "",
  });

  const [touched, setTouched] = useState<Touched>({});
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const services = [
    "Virtual Tours",
    "360 Degree 3D Tour",
    "Google Street View",
    "360° Photography",
    "360° Aerial Video (Drone)",
    "360° Videography & Immersive",
  ];

  const validateField = (name: keyof FormDataShape, value: string): string => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Please enter your full name." : "";
      case "email":
        return !emailRx.test(value) ? "Enter a valid email address." : "";
      case "phone":
        return value && !phoneRx.test(value) ? "Enter a valid phone." : "";
      case "message":
        return value.trim().length < 10
          ? "Please add at least 10 characters."
          : "";
      default:
        return "";
    }
  };

  const validateAll = (data: FormDataShape): Errors => {
    const out: Errors = {};
    (Object.keys(data) as (keyof FormDataShape)[]).forEach((key) => {
      const msg = validateField(key, data[key] || "");
      if (msg) out[key] = msg;
    });
    return out;
  };

  const setField = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (touched[name as keyof Touched]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormDataShape, value),
      }));
    }
  };

  const onBlur = (name: keyof FormDataShape) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  /* Copy to clipboard for email/phone */
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateAll(formData);
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
      company: touched.company || false,
      service: touched.service || false,
      project: touched.project || false,
      website: true,
    });
    if (Object.values(newErrors).some(Boolean)) return;

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

      const raw = await res.text();
      let data: ApiResponse | null = null;

      if (raw) {
        try {
          data = JSON.parse(raw) as ApiResponse;
        } catch (err) {
          // ignore non-JSON response, safe fallback
          if (import.meta.env.DEV) {
            console.warn("Non-JSON response:", raw, err);
          }
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
      setTouched({});
      setErrors({});
      setTimeout(() => setIsSubmitted(false), 3500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const contactInfo: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    link?: string;
    key: "email" | "phone" | "hours";
  }> = [
    {
      icon: Mail,
      label: "Email Us",
      value: "mktg@ruthram360.com",
      link: "mailto:mktg@ruthram360.com",
      key: "email",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 93452 58381",
      link: "tel:+919345258381",
      key: "phone",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon–Sat: 9AM–6PM",
      key: "hours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .hero-grid {
          background-image:
            linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16,185,129,0.35); }
          50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(16,185,129,0.0); }
        }
        .hover-pulse:hover { animation: pulse-soft 1.2s ease-in-out infinite; }
      `}</style>

      {/* ===== Hero (kept to your style) ===== */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[6px]" />
          <div className="absolute inset-0 hero-grid pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-muted-foreground mb-6 px-4">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 max-w-3xl mx-auto mb-12 px-4">
              Ready to transform your space with immersive virtual experiences?
              Let’s discuss your project and create something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Content ===== */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: info -> card with icons + copy actions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="glass-card p-6">
                <h2 className="text-2xl font-bold text-muted-foreground mb-2">
                  Let’s Start a Conversation
                </h2>
                <p className="text-muted-foreground">
                  Whether you need a quick quote or want to discuss a complex
                  project, we’re here to help.
                </p>

                <div className="mt-6 space-y-4">
                  {contactInfo.map((info) => {
                    const isCopyable =
                      info.key === "email" || info.key === "phone";
                    const wasCopied = copiedKey === info.key;
                    const RightIcon = wasCopied ? CheckMini : Copy;

                    return (
                      <div
                        key={info.key}
                        className="flex items-start gap-3 rounded-xl border border-zinc-200 p-4 hover:bg-white/50 transition"
                      >
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <info.icon size={22} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs uppercase tracking-wide text-zinc-500">
                            {info.label}
                          </div>
                          <div className="font-medium text-muted-foreground">
                            {info.link ? (
                              <a href={info.link} className="hover:underline">
                                {info.value}
                              </a>
                            ) : (
                              info.value
                            )}
                          </div>
                        </div>

                        {isCopyable && (
                          <button
                            type="button"
                            onClick={() => copyText(info.key, info.value)}
                            className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900"
                            aria-label={`Copy ${info.key}`}
                            title={wasCopied ? "Copied!" : "Click to Copy"}
                          >
                            <RightIcon size={16} />
                            <span className="hidden sm:inline">
                              {wasCopied ? "Copied" : "Copy"}
                            </span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <motion.a
                  href="https://wa.me/919345258381?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20call."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 btn-primary w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} className="text-white" />
                  <span>WhatsApp</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Right: form with inline validation + loading + success */}
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
                    onChange={setField}
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
                        onChange={setField}
                        onBlur={() => onBlur("name")}
                        required
                        className={`w-full bg-white text-gray-900 border rounded-lg px-4 py-3 placeholder-gray-500 outline-none transition
                          ${
                            touched.name
                              ? errors.name
                                ? "border-red-500 focus:border-red-600"
                                : "border-emerald-500 focus:border-emerald-600"
                              : "border-gray-200 focus:border-primary"
                          }`}
                        placeholder="Enter your full name"
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
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
                        onChange={setField}
                        onBlur={() => onBlur("email")}
                        required
                        className={`w-full bg-white text-gray-900 border rounded-lg px-4 py-3 placeholder-gray-500 outline-none transition
                          ${
                            touched.email
                              ? errors.email
                                ? "border-red-500 focus:border-red-600"
                                : "border-emerald-500 focus:border-emerald-600"
                              : "border-gray-200 focus:border-primary"
                          }`}
                        placeholder="your@email.com"
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
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
                        onChange={setField}
                        onBlur={() => onBlur("phone")}
                        className={`w-full bg-white text-gray-900 border rounded-lg px-4 py-3 placeholder-gray-500 outline-none transition
                          ${
                            touched.phone
                              ? errors.phone
                                ? "border-red-500 focus:border-red-600"
                                : formData.phone
                                ? "border-emerald-500 focus:border-emerald-600"
                                : "border-gray-200 focus:border-primary"
                              : "border-gray-200 focus:border-primary"
                          }`}
                        placeholder="+91 12345 67890"
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
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
                        onChange={setField}
                        onBlur={() => onBlur("company")}
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
                      options={services}
                      placeholder="Select a service"
                      onChange={setField}
                      onBlur={() => onBlur("service")}
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
                      onChange={setField}
                      onBlur={() => onBlur("project")}
                      className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-500 outline-none focus:border-primary transition"
                      placeholder="e.g., Real estate listing, restaurant showcase, office tour"
                    />
                  </div>

                  <div className="pb-24 md:pb-0">
                    <label className="block text-muted-foreground font-medium mb-2">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={setField}
                      onBlur={() => onBlur("message")}
                      rows={5}
                      required
                      className={`w-full bg-white text-gray-900 border rounded-lg px-4 py-3 placeholder-gray-500 outline-none transition resize-none
                        ${
                          touched.message
                            ? errors.message
                              ? "border-red-500 focus:border-red-600"
                              : "border-emerald-500 focus:border-emerald-600"
                            : "border-gray-200 focus:border-primary"
                        }`}
                      placeholder="Tell us more about your project, timeline, specific requirements, or any questions you have..."
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Desktop/Tablet submit */}
                  <div className="hidden md:block">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: sending ? 1 : 1.02 }}
                      whileTap={{ scale: sending ? 1 : 0.98 }}
                      disabled={sending}
                      className="w-full btn-primary disabled:opacity-70 flex items-center justify-center gap-2"
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
                  </div>
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

        {/* Mobile sticky action bar */}
        <div className="md:hidden fixed inset-x-0 bottom-0 bg-white/90 backdrop-blur border-t border-zinc-200 px-4 py-3">
          <motion.button
            type="button"
            onClick={() => {
              const form = document.querySelector("form");
              form?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
              );
            }}
            whileHover={{ scale: sending ? 1 : 1.02 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
            disabled={sending}
            className="w-full btn-primary disabled:opacity-70 flex items-center justify-center gap-2"
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
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
