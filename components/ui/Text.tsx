import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

type TextVariant = "h1" | "h2" | "h3" | "body" | "small" | "caption";
type TextElement = "h1" | "h2" | "h3" | "p" | "span";

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "font-display text-[2.5rem] md:text-[4rem] font-light leading-[1.2] tracking-[0.064em] md:tracking-[0.08em]",
  h2: "font-display text-[1.75rem] md:text-[2.5rem] font-light leading-[1.2] tracking-[0.048em] md:tracking-[0.06em]",
  h3: "font-display text-[1.25rem] md:text-[1.5rem] font-normal leading-[1.2] tracking-[0.032em] md:tracking-[0.04em]",
  body: "font-body text-base font-light leading-[1.7] tracking-[0.02em]",
  small: "font-body text-sm font-light leading-[1.7] tracking-[0.03em]",
  caption:
    "font-body text-xs font-normal uppercase leading-[1.7] tracking-[0.06em]",
};

const defaultElement: Record<TextVariant, TextElement> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  small: "p",
  caption: "span",
};

const defaultVariant: Record<TextElement, TextVariant> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  p: "body",
  span: "caption",
};

export function Text({
  as,
  variant,
  children,
  className,
  ...props
}: TextProps) {
  const resolvedVariant = variant ?? (as ? defaultVariant[as] : "body");
  const Component: ElementType = as ?? defaultElement[resolvedVariant];

  return (
    <Component
      className={cn(variantStyles[resolvedVariant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
