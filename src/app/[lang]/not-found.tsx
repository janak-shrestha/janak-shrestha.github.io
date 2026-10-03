import { lang } from "next/root-params";
import { hasLocale, localePath, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Split from "@/components/Split";
import Link from "next/link";
import { Arrow } from "@/components/icons";

/** Rendered for unknown URLs (via the catch-all route) inside the normal layout. */
export default async function NotFound() {
  const raw = await lang();
  const locale = raw && hasLocale(raw) ? raw : defaultLocale;
  const { dict } = await getDictionary(locale);
  const t = dict.notFound;

  return (
    <section className="incident">
      <div>
        <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
        <Split as="h1" className="display incident__code">
          4<em>0</em>4
        </Split>
        <p className="lead" data-reveal>{t.text}</p>
        <div className="btn-row btn-row--center" data-reveal>
          <Link className="btn btn--solid" href={localePath(locale)}>
            {t.home} <Arrow />
          </Link>
          <Link className="btn btn--ghost" href={localePath(locale, "contact")}>
            {t.report}
          </Link>
        </div>
      </div>
    </section>
  );
}
