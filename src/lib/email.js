// src/lib/email.js
import emailjs from "@emailjs/browser";

/**
 * Configure with env vars (recommended) or replace the fallback strings.
 * Vite:    VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY
 * Next.js: NEXT_PUBLIC_EMAILJS_SERVICE_ID / NEXT_PUBLIC_EMAILJS_TEMPLATE_ID / NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 */
const SERVICE_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_SERVICE_ID) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_SERVICE_ID) ||
  "YOUR_SERVICE_ID";

const TEMPLATE_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_TEMPLATE_ID) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) ||
  "YOUR_TEMPLATE_ID";

const PUBLIC_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_EMAILJS_PUBLIC_KEY) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) ||
  "YOUR_PUBLIC_KEY";

/**
 * Send the contact email via EmailJS.
 * @param {{
 *  name:string; email:string; phone?:string; company?:string;
 *  service?:string; project?:string; budget?:string; message:string;
 *  toEmail?: string; // defaults to ruthrammedia@gmail.com
 * }} data
 * @returns {Promise<{ok:boolean; status?:number; text?:string; error?:any}>}
 */
export async function sendContactEmail(data) {
  const {
    name,
    email,
    phone = "",
    company = "",
    service = "",
    project = "",
    budget = "",
    message,
    toEmail = "ruthrammedia@gmail.com",
  } = data;

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return {
      ok: false,
      error:
        "EmailJS keys missing. Set SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY (env or hardcoded).",
    };
  }

  // These keys MUST match your EmailJS template variable names
  const templateParams = {
    name,
    email,          // set as reply_to in your template
    phone,
    company,
    service,
    project,
    budget,
    message,
    to_email: toEmail, // optional if template has a fixed recipient
  };

  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
    return { ok: true, status: res.status, text: res.text };
  } catch (error) {
    console.error("[EmailJS] sendContactEmail error:", error);
    return { ok: false, error };
  }
}
