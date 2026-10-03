import "server-only";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import type { Dictionary } from "@/content/en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/content/en").then((m) => m.default),
  de: () => import("@/content/de").then((m) => m.default),
};

/** Resolves the route's `lang` param to a supported locale, or renders the 404 page. */
export function resolveLocale(lang: string): Locale {
  if (!hasLocale(lang)) notFound();
  return lang;
}

export async function getDictionary(lang: string): Promise<{ locale: Locale; dict: Dictionary }> {
  const locale = resolveLocale(lang);
  return { locale, dict: await dictionaries[locale]() };
}
