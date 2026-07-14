"use client";

import { FormEvent, useState } from "react";
import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";
// Ludlow enquiry form — 2026-07-14: Google Ads landing page form. Submissions
// go straight to Netlify Forms (the n8n/Monday hand-off gets reconnected once
// the form is confirmed working there). The static mirror that lets Netlify's
// build bot register the form lives in public/__forms.html — field names must
// match it character for character or Netlify drops them silently.
import { trackEvent } from "@/lib/analytics";

const labelStyles =
  "font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal";
const fieldStyles =
  "mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay";

type Status = "idle" | "sending" | "sent" | "error";

export function LudlowEnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, typeof value === "string" ? value : "");
    });

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms responded ${res.status}`);
      trackEvent("form_submit", { form_name: "ludlow-enquiry", page: "ludlow" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-linen px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2">Send us an enquiry</Text>
          <Text variant="body" className="mt-4 max-w-md text-stone">
            Tell us a little about your project and the Ludlow team will be in
            touch.
          </Text>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          {status === "sent" ? (
            <div className="mt-12 max-w-2xl bg-cream p-8 md:p-12">
              <Text as="h3">Thank you for your enquiry</Text>
              <Text variant="body" className="mt-3 text-stone">
                Your message is on its way to the Ludlow team. We will be in
                touch shortly.
              </Text>
            </div>
          ) : (
            <form
              name="ludlow-enquiry"
              method="POST"
              onSubmit={handleSubmit}
              className="mt-12 max-w-2xl bg-cream p-8 md:p-12"
            >
              <input type="hidden" name="form-name" value="ludlow-enquiry" />
              {/* Honeypot — visually hidden, humans never see or fill it */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Do not fill this in if you are human:{" "}
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="ludlow-name" className={labelStyles}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="ludlow-name"
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldStyles}
                  />
                </div>
                <div>
                  <label htmlFor="ludlow-email" className={labelStyles}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="ludlow-email"
                    name="email"
                    required
                    autoComplete="email"
                    className={fieldStyles}
                  />
                </div>
                <div>
                  <label htmlFor="ludlow-phone" className={labelStyles}>
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="ludlow-phone"
                    name="phone"
                    autoComplete="tel"
                    className={fieldStyles}
                  />
                </div>
                <div>
                  <label htmlFor="ludlow-project-type" className={labelStyles}>
                    Project type
                  </label>
                  <select
                    id="ludlow-project-type"
                    name="project-type"
                    className={fieldStyles}
                  >
                    <option value="">Please select</option>
                    <option value="upholstery">Upholstery</option>
                    <option value="fabric-selection">Fabric selection</option>
                    <option value="full-interior-design">
                      Full interior design
                    </option>
                    <option value="home-staging">Home staging</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ludlow-message" className={labelStyles}>
                    Message
                  </label>
                  <textarea
                    id="ludlow-message"
                    name="message"
                    rows={4}
                    required
                    className={`${fieldStyles} resize-none`}
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-block bg-[#B49A6B] px-8 py-3 font-body text-xs font-normal uppercase tracking-[0.06em] text-cream transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)] hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Sending" : "Send enquiry"}
                </button>
                {status === "error" && (
                  <p className="mt-4 font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-clay">
                    Sorry, something went wrong and your enquiry was not sent.
                    Please try again, or call us on{" "}
                    <a href="tel:+441584708381" className="underline underline-offset-4">
                      01584 708381
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  );
}
