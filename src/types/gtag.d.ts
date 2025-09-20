// src/types/gtag.d.ts
export {};

declare global {
  /** Minimal GA4 config we actually use */
  interface GtagConfig {
    page_path?: string;
    send_page_view?: boolean;
    // allow arbitrary GA fields without using `any`
    [key: string]: unknown;
  }

  type GtagJsTuple = ["js", Date];
  type GtagConfigTuple = ["config", string, GtagConfig?];
  type GtagEventTuple = ["event", string, Record<string, unknown>?];
  type GtagConsentTuple = ["consent", "update", Record<string, string>];

  type GtagArgs = GtagJsTuple | GtagConfigTuple | GtagEventTuple | GtagConsentTuple;

  // Overloaded signature avoids `any`
  interface GtagFunction {
    (...args: GtagJsTuple): void;
    (...args: GtagConfigTuple): void;
    (...args: GtagEventTuple): void;
    (...args: GtagConsentTuple): void;
  }

  interface Window {
    dataLayer: unknown[]; // not `any[]`
    gtag: GtagFunction;
  }
}
