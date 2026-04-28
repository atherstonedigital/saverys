import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Savery's of Broadway. How we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <Text as="h1">Privacy Policy</Text>
          <Text variant="small" className="mt-2 text-stone/60">
            Last updated: March 2026
          </Text>
        </SectionReveal>

        <SectionReveal>
          <div className="journal-body mt-10">
            <h2>Who we are</h2>
            <p>
              Savery&apos;s of Broadway is a luxury interior design studio
              operated by Lyndsey Savery Interior Design Ltd. Our registered
              office is at Cotswold Design Centre, Kennel Lane, Broadway,
              Worcestershire, WR12 7DJ.
            </p>

            <h2>What data we collect</h2>
            <p>
              When you contact us via our website form, we collect your name,
              email address, and the content of your message. We use this
              information solely to respond to your enquiry and to discuss
              potential projects.
            </p>

            <h2>How we use your data</h2>
            <p>
              We use your personal data to respond to enquiries, provide design
              consultations, and manage ongoing client relationships. We do not
              sell, rent, or share your personal data with third parties for
              marketing purposes.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses essential cookies required for the site to
              function. We do not use tracking or advertising cookies.
            </p>

            <h2>Your rights</h2>
            <p>
              Under GDPR, you have the right to access, correct, or delete your
              personal data. To exercise these rights, please contact us at{" "}
              <a href="mailto:studio@lyndseysavery.co.uk">studio@lyndseysavery.co.uk</a>.
            </p>

            <h2>Contact</h2>
            <p>
              For any questions about this privacy policy, please contact us at{" "}
              <a href="mailto:studio@lyndseysavery.co.uk">studio@lyndseysavery.co.uk</a> or
              call 01386 858941.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
