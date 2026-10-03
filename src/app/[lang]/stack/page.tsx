import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { certifications, stack } from "@/content/shared";
import Split from "@/components/Split";
import { StackGrid } from "@/components/widgets";

export async function generateMetadata({ params }: PageProps<"/[lang]/stack">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "stack", dict, "stack");
}

/** Circle path for the text running around each certification seal. */
const RING = "M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0";

export default async function Stack({ params }: PageProps<"/[lang]/stack">) {
  const { dict } = await getDictionary((await params).lang);
  const t = dict.stack;
  const categories = stack.map((c) => ({ ...c, title: t.categories[c.id][0], text: t.categories[c.id][1] }));

  return (
    <>
      <section className="page-hero wrap">
        <div className="page-hero__meta">
          <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
          <span className="mono muted" data-reveal="fade">{t.meta}</span>
        </div>
        <div className="page-hero__grid">
          <Split as="h1" className="display h1">{t.title}</Split>
          <p className="lead" data-reveal style={{ ["--d" as string]: ".25s" }}>
            {t.lead(<span className="tool core tool--inline">{t.coreLabel}</span>)}
          </p>
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <StackGrid categories={categories} filters={t.filters} aria={t.filterAria} />
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="num">{t.certs.num}</span>
            <Split className="h2">{t.certs.title}</Split>
          </div>
          <p className="lead" data-reveal>{t.certs.lead}</p>
        </div>
        <div className="seals">
          {certifications.map((c, i) => (
            <div className={`seal${c.highlight ? " seal--new" : ""}`} tabIndex={0} data-reveal style={{ ["--d" as string]: `${(i % 4) * 0.05}s` }} key={c.code}>
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <defs>
                  <path id={`ring-${i}`} d={RING} />
                </defs>
                <text>
                  <textPath href={`#ring-${i}`} textLength="505" lengthAdjust="spacing">
                    {c.ring}
                  </textPath>
                </text>
              </svg>
              <div>
                <strong>{c.code}</strong>
                <small>{t.certs.names[c.code]}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
