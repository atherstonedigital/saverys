"use client";

import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "ghost" | "secondary" | "text";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseStyles =
  "inline-block uppercase tracking-[0.06em] text-xs font-normal transition-all duration-[var(--duration-fast)] ease-[var(--ease-saverys)] disabled:cursor-not-allowed disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  ghost:
    "border border-charcoal bg-transparent text-charcoal px-8 py-3 hover:bg-charcoal hover:text-cream",
  secondary:
    "border border-saverys-green bg-transparent text-charcoal px-8 py-3 hover:bg-saverys-green hover:text-cream",
  text: "text-charcoal underline underline-offset-4 hover:text-clay",
};

export function Button({
  variant = "ghost",
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
