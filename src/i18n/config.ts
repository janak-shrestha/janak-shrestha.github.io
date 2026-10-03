export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Site sections in navigation order. `""` is the home page. */
export const pages = ["", "about", "experience", "stack", "blog", "contact"] as const;
export type PageSlug = (typeof pages)[number];

/**
 * Public URL for a page. English lives at the root (/about),
 * German under /de (/de/about). The proxy maps root URLs to the `en` route.
 */
export function localePath(lang: Locale, slug: PageSlug | string = ""): string {
  const clean = slug.replace(/^\/+/, "");
  if (lang === defaultLocale) return clean ? `/${clean}` : "/";
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

/** Splits a public pathname into its locale and page slug. */
export function parsePath(pathname: string): { lang: Locale; slug: string } {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && hasLocale(parts[0])) {
    return { lang: parts[0], slug: parts.slice(1).join("/") };
  }
  return { lang: defaultLocale, slug: parts.join("/") };
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.janakshrestha25.com.np").replace(/\/$/, "");
