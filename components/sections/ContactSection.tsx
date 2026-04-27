"use client";

import { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";
// SEO launch prep — 2026-04-27
import { trackEvent, type EventParams } from "@/lib/analytics";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// SEO launch prep — 2026-04-27
// ContactSection is embedded on the homepage as well as /contact, so a
// top-level import of @marsidev/react-turnstile would evaluate the package
// (and load Cloudflare's challenge script) on every page. Lazy-load it,
// client-only, so:
//   - the chunk is only fetched when we actually render the widget, and
//   - any package-level side effect can't crash hydration on routes that
//     don't need spam protection.
const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false },
);

type ShowroomKey = "broadway" | "ludlow" | "chelsea";

const showrooms: Array<{
  key: ShowroomKey;
  name: string;
  address: string;
  phone: string;
  phoneTel: string;
  mobile?: string;
  mobileTel?: string;
}> = [
  {
    key: "broadway",
    name: "Broadway",
    address: "Cotswold Design Centre, Kennel Lane, Broadway, WR12 7DJ",
    phone: "01386 858941",
    phoneTel: "+441386858941",
    mobile: "07894 096098",
    mobileTel: "+447894096098",
  },
  {
    key: "ludlow",
    name: "Ludlow",
    address: "1 Tower Street, Ludlow, SY8 1RL",
    phone: "01584 708381",
    phoneTel: "+441584708381",
    mobile: "07415 065580",
    mobileTel: "+447415065580",
  },
  {
    key: "chelsea",
    name: "Chelsea",
    address: "Suite 9, 405 Kings Road, Chelsea",
    phone: "020 3668 1000",
    phoneTel: "+442036681000",
  },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  // SEO launch prep — 2026-04-27: Turnstile spam gate
  const [token, setToken] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    if (TURNSTILE_SITE_KEY && !token) {
      setSubmitError("Please complete the verification before sending.");
      return;
    }
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = typeof value === "string" ? value : "";
    });
    if (token) payload["cf-turnstile-response"] = token;

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      // SEO launch prep — 2026-04-27: only fire on successful submit
      trackEvent("form_submit", { form_name: "main_contact" });
      setSubmitted(true);
      form.reset();
      setToken(null);
    } else {
      setSubmitError("Sorry, something went wrong. Please try again or email us directly.");
    }
  }

  // SEO launch prep — 2026-04-27
  const handleEventClick = (
    name: Parameters<typeof trackEvent>[0],
    params?: EventParams,
  ) => () => trackEvent(name, params);

  return (
    <section className="px-6 py-16 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionReveal>
          <Text as="h2">Begin a conversation</Text>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 gap-16 md:mt-16 md:grid-cols-2">
          {/* Left: details + form */}
          <div>
            <SectionReveal delay={0.1}>
              <Text variant="body" className="max-w-md text-stone">
                Every project begins with listening. We take the time to
                understand how you live, what you value, and what a room should
                feel like.
              </Text>

              <div className="mt-8">
                <Text variant="caption" className="text-charcoal">
                  Email
                </Text>
                <a
                  href="mailto:studio@lindsaysavery.co.uk"
                  onClick={handleEventClick("email_click", { location: "general" })}
                  className="mt-1 block font-body text-base font-light leading-[1.7] tracking-[0.02em] text-charcoal transition-colors duration-[var(--duration-fast)] hover:text-clay"
                >
                  studio@lindsaysavery.co.uk
                </a>
              </div>

              <div className="mt-10">
                <Text variant="caption" className="text-charcoal">
                  Come and visit us
                </Text>
                <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {showrooms.map((showroom) => (
                    <div key={showroom.name}>
                      <Text
                        variant="small"
                        className="font-normal text-charcoal"
                      >
                        {showroom.name}
                      </Text>
                      <Text variant="small" className="mt-1 text-stone">
                        {showroom.address}
                      </Text>
                      <a
                        href={`tel:${showroom.phoneTel}`}
                        onClick={handleEventClick("phone_click", { location: showroom.key })}
                        className="mt-2 block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-stone transition-colors duration-[var(--duration-fast)] hover:text-clay"
                      >
                        {showroom.phone}
                      </a>
                      {showroom.mobile && showroom.mobileTel && (
                        <a
                          href={`tel:${showroom.mobileTel}`}
                          onClick={handleEventClick("phone_click", { location: showroom.key })}
                          className="block font-body text-sm font-light leading-[1.7] tracking-[0.03em] text-stone transition-colors duration-[var(--duration-fast)] hover:text-clay"
                        >
                          {showroom.mobile}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <form
                className="mt-12 flex flex-col gap-8"
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div>
                  <label
                    htmlFor="enquiry_type"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Enquiry type
                  </label>
                  <select
                    id="enquiry_type"
                    name="enquiry_type"
                    className="mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  >
                    <option value="">Please select</option>
                    <option value="full-interior-design">Full interior design project</option>
                    <option value="fabric-sourcing">Fabric &amp; material sourcing</option>
                    <option value="furniture-curation">Furniture curation</option>
                    <option value="consultation">Initial consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 w-full border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="font-body text-xs font-normal uppercase tracking-[0.06em] text-charcoal"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none border-b border-charcoal/40 bg-transparent pb-2 font-body text-base font-light text-charcoal outline-none transition-colors duration-[var(--duration-fast)] focus:border-clay"
                  />
                </div>
                {/* SEO launch prep — 2026-04-27: Cloudflare Turnstile spam gate.
                    Falls back to no-gate when the public site key is unset
                    (e.g. local dev without Cloudflare configured). */}
                {TURNSTILE_SITE_KEY && (
                  <div>
                    <Turnstile
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={(t) => setToken(t)}
                      onExpire={() => setToken(null)}
                      onError={() => setToken(null)}
                    />
                  </div>
                )}
                <div>
                  <Button
                    type="submit"
                    disabled={Boolean(TURNSTILE_SITE_KEY) && !token}
                  >
                    Send message
                  </Button>
                  {submitted && (
                    <p className="mt-4 font-body text-sm text-charcoal">
                      Thank you for your enquiry. We will be in touch shortly.
                    </p>
                  )}
                  {submitError && (
                    <p className="mt-4 font-body text-sm text-clay">{submitError}</p>
                  )}
                </div>
              </form>
            </SectionReveal>
          </div>

          {/* Right: atmospheric image */}
          <div className="hidden md:block">
            <SectionReveal delay={0.15}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/hero/contact.webp"
                  alt="Ikat armchair with botanical prints"
                  fill
                  className="object-cover object-top"
                  sizes="50vw"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
