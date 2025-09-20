// src/types/analytics.d.ts
export {};

declare global {
  interface Window {
    /** GA4 dataLayer */
    dataLayer: unknown[];
    /** GA4 gtag function */
    gtag: (...args: unknown[]) => void;
  }
}
