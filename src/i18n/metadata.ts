import type { Metadata } from "next";
import { localePath, siteUrl, type Locale, type PageSlug } from "./config";
import type { Dictionary } from "@/content/en";

type MetaKey = keyof Dictionary["meta"];

/** Page metadata with canonical URL, hreflang alternates and Open Graph. */
export function pageMetadata(locale: Locale, slug: PageSlug, dict: Dictionary, key: MetaKey): Metadata {
  const { title, description } = dict.meta[key];
  const isHome = slug === "";
  return {
    // The home title is already complete; other pages get the " · Janak Shrestha" template.
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localePath(locale, slug),
      languages: {
        en: localePath("en", slug),
        de: localePath("de", slug),
        "x-default": localePath("en", slug),
      },
    },
    openGraph: {
      title: isHome ? title : `${title} · Janak Shrestha`,
      description,
      url: `${siteUrl}${localePath(locale, slug)}`,
      siteName: "Janak Shrestha",
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
      images: [{ url: "/images/profile.jpeg", width: 1024, height: 768 }],
    },
  };
}
