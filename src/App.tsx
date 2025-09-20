import React, { ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Helmet, HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

/* ───────────────── Scroll to top on route change ───────────────── */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (location.hash) return;

    // immediate reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // ensure after transition/layout
    const id = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, location.hash]);

  return null;
};

/* ───────────────── Page transition wrapper ───────────────── */
const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    {children}
  </motion.div>
);

/* ───────────────── Layout wrapper ───────────────── */
const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

/* ───────────────── GA4: SPA pageviews only (no script injection) ───────────────── */
const GAListener = () => {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    if (typeof window.gtag !== "function") return; // loaded from index.html

    // SPA pageview on route changes
    window.gtag("config", GA_ID, {
      page_path: `${location.pathname}${location.search}`,
    });
  }, [location.pathname, location.search]);

  return null;
};

/* ───────────────── Centralized per-route SEO (Helmet) ───────────────── */
const RouteMeta = () => {
  const { pathname } = useLocation();

  // Put your real domain here
  const site = "https://ruthram360.com";
  const ogImage = `${site}/og-image.jpg`;

  const meta = (() => {
    switch (pathname) {
      case "/":
        return {
          title: "Ruthram360° | Virtual Tours & Google Street View",
          desc:
            "Immersive 360° Virtual Tours, 3D Tours, and Google Street View for campuses, hospitals, hotels, and businesses.",
          url: `${site}/`,
        };
      case "/about":
        return {
          title: "About | Ruthram360°",
          desc:
            "We craft immersive, interactive virtual tours powered by modern 360° capture and Google Street View expertise.",
          url: `${site}/about`,
        };
      case "/services":
        return {
          title: "Services | Ruthram360°",
          desc:
            "360° photography, Google Street View integration, drone imaging, campus mapping, and interactive tour development.",
          url: `${site}/services`,
        };
      case "/portfolio":
        return {
          title: "Portfolio | Ruthram360°",
          desc:
            "Explore our virtual tours for campuses, resorts, smart cities, hospitals, and more.",
          url: `${site}/portfolio`,
        };
      case "/contact":
        return {
          title: "Contact | Ruthram360°",
          desc:
            "Get in touch for demos, proposals, and project consultations for virtual tours and Street View.",
          url: `${site}/contact`,
        };
      default:
        return {
          title: "Ruthram360°",
          desc:
            "Immersive 360° virtual tours and Google Street View solutions that convert.",
          url: `${site}${pathname}`,
        };
    }
  })();

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph / Social */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon – ensure /public/favicon.ico exists */}
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

/* ───────────────── Animated Routes ───────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <PageTransition>
                <Index />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <PageTransition>
                <Services />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Layout>
              <PageTransition>
                <Portfolio />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <PageTransition>
                <About />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <PageTransition>
                <Contact />
              </PageTransition>
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <PageTransition>
                <NotFound />
              </PageTransition>
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        {/* If deploying in a subfolder, set basename="/subfolder" and match Vite base */}
        <BrowserRouter /* basename="/" */>
          <ScrollToTop />
          <GAListener />
          <RouteMeta />
          <AnimatedRoutes />
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
