import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/i18n/config";

/**
 * English is served without a prefix (/about) and German under /de (/de/about).
 * Every route lives in app/[lang], so unprefixed URLs are rewritten to /en/...
 * and explicit /en/... URLs are redirected to their canonical unprefixed form.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/de" || pathname.startsWith("/de/")) return NextResponse.next();

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, CV, icons).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
