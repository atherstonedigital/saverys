import { Text } from "@/components/ui/Text";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils";

interface SourcingBlockProps {
  className?: string;
  heading?: string;
  body?: string;
}

const DEFAULT_HEADING = "Sourcing";
const DEFAULT_BODY =
  "We work directly with fabric suppliers from around the world, carefully chosen craftspeople and source only the very best products to bring into our workrooms based in Broadway, in the heart of the Cotswolds.";

export function SourcingBlock({
  className,
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
}: SourcingBlockProps) {
  return (
    <section
      className={cn("px-6 py-16 md:px-12 md:py-32", className)}
      aria-labelledby="sourcing-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <SectionReveal>
          <Text as="h2" id="sourcing-heading">
            {heading}
          </Text>
          <Text variant="body" className="mx-auto mt-8 max-w-2xl text-stone">
            {body}
          </Text>
        </SectionReveal>
      </div>
    </section>
  );
}
