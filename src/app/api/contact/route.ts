import { NextResponse } from "next/server";

/**
 * Receives the contact and blog-notify forms and forwards them to Formspree.
 * FORMSPREE_ENDPOINT is a server-only env var (no NEXT_PUBLIC_ prefix), so the
 * endpoint never reaches the browser.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, subject: 200, message: 2000, topic: 60, language: 20 };

// Best-effort rate limit: 5 submissions per IP per 10 minutes. On serverless
// hosting each instance keeps its own window, which is enough to blunt bursts.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, LIMITS[key]) : "";
}

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  // Only accept submissions made from this site's own pages.
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) return fail(403, "forbidden");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail(429, "too_many_requests");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "invalid_json");
  }

  // Honeypot: real visitors never see this field. Pretend success to bots.
  if (typeof body._gotcha === "string" && body._gotcha.length > 0) return NextResponse.json({ ok: true });

  const kind = body.kind === "notify" ? "notify" : "contact";
  const email = field(body, "email");
  const language = field(body, "language") || "English";
  if (!EMAIL.test(email)) return fail(400, "invalid_email");

  let payload: Record<string, string>;
  if (kind === "notify") {
    payload = { email, topic: "Blog: notify me", language, _subject: "Blog notification signup" };
  } else {
    const name = field(body, "name");
    const subject = field(body, "subject");
    const message = field(body, "message");
    if (!name || !subject || !message) return fail(400, "missing_fields");
    payload = { name, email, subject, message, topic: field(body, "topic"), language, _subject: `Portfolio: ${subject}` };
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    console.error("FORMSPREE_ENDPOINT is not set");
    return fail(500, "not_configured");
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Formspree rejected submission", res.status, await res.text().catch(() => ""));
      return fail(502, "upstream_error");
    }
  } catch (err) {
    console.error("Formspree request failed", err);
    return fail(502, "upstream_unreachable");
  }

  return NextResponse.json({ ok: true });
}
