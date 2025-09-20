import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export default function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!GA_ID) return;
    if (!window.gtag) return;

    window.gtag("config", GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
