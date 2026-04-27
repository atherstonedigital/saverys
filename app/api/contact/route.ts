// SEO launch prep — 2026-04-27
// Contact form endpoint. Verifies a Cloudflare Turnstile token and forwards
// the submission to Netlify Forms (/__forms.html) on the same origin.
//
// Env vars (set in Netlify production context):
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY (client)
//   TURNSTILE_SECRET_KEY (server)
//
// If TURNSTILE_SECRET_KEY is not set we skip verification (so staging /
// preview deploys without the secret still accept submissions for testing).
import { NextResponse } from "next/server";

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function POST(request: Request) {
  let payload: Record<string, string> = {};
  try {
    const data = await request.json();
    payload = (data || {}) as Record<string, string>;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const token = payload["cf-turnstile-response"];
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (secret) {
    if (!token) {
      return NextResponse.json(
        { error: "Verification token missing" },
        { status: 400 },
      );
    }
    const verify = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const verifyJson = (await verify.json()) as { success?: boolean };
    if (!verifyJson.success) {
      return NextResponse.json(
        { error: "Verification failed" },
        { status: 400 },
      );
    }
  }

  // Strip the Turnstile token before forwarding to Netlify Forms — keep only
  // the actual form fields.
  const { ["cf-turnstile-response"]: _drop, ...formFields } = payload;
  void _drop;
  formFields["form-name"] = formFields["form-name"] || "contact";

  const origin = new URL(request.url).origin;
  const netlifyResponse = await fetch(`${origin}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formFields).toString(),
  });

  if (!netlifyResponse.ok) {
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
