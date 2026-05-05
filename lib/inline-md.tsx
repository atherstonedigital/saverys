import Link from "next/link";
import type { ReactNode } from "react";

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const ANCHOR_CLASSES =
  "text-charcoal underline underline-offset-[3px] transition-colors duration-300 hover:text-clay";

export function renderInlineLinks(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link key={key++} href={href} className={ANCHOR_CLASSES}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key++}
          href={href}
          className={ANCHOR_CLASSES}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>,
      );
    }
    lastIndex = LINK_RE.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes.length === 0 ? text : nodes;
}
