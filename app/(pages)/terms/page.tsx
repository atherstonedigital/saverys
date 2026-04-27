import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { Text } from "@/components/ui/Text";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Savery's of Broadway website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <Text as="h1">Terms of Service</Text>
          <Text variant="small" className="mt-2 text-stone/60">
            Last updated: March 2026
          </Text>
        </SectionReveal>

        <SectionReveal>
          <div className="journal-body mt-10">
            <h2>Use of this website</h2>
            <p>
              This website is operated by Lyndsey Savery Interior Design Ltd,
              trading as Savery&apos;s of Broadway. By using this website, you
              agree to these terms.
            </p>

            <h2>Intellectual property</h2>
            <p>
              All content on this website — including text, images, and design —
              is the property of Savery&apos;s of Broadway unless otherwise
              stated. You may not reproduce, distribute, or use any content
              without our written permission.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              While we make every effort to ensure the accuracy of information
              on this website, we cannot guarantee that all content is complete
              or up to date. Savery&apos;s of Broadway is not liable for any
              loss or damage arising from your use of this website.
            </p>

            <h2>Contact</h2>
            <p>
              For any questions about these terms, please contact us at{" "}
              <a href="mailto:studio@lindsaysavery.co.uk">studio@lindsaysavery.co.uk</a>.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
