import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import Split from "@/components/Split";
import { ChangeList } from "@/components/widgets";
import type { ChangeKind } from "@/content/en";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "experience", dict, "experience");
}

export default async function Experience({ params }: PageProps<"/[lang]/experience">) {
  const { dict } = await getDictionary((await params).lang);
  const t = dict.experience;
  const kinds = Object.entries(t.legend) as [ChangeKind, string][];

  return (
    <>
      <section className="page-hero wrap">
        <div className="page-hero__meta">
          <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
          <span className="mono muted" data-reveal="fade">{t.meta}</span>
        </div>
        <div className="page-hero__grid">
          <Split as="h1" className="display h1">{t.title}</Split>
          <div data-reveal style={{ ["--d" as string]: ".25s" }}>
            <p className="lead">{t.lead}</p>
            <div className="legend">
              {kinds.map(([kind, label]) => (
                <span key={kind}>
                  <b className={`kind kind--${kind}`}>{kind}</b> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <div className="log">
          <div className="log__rail" aria-hidden="true">
            <i />
          </div>
          {t.releases.map((r, i) => {
            const id = `changes-${i}`;
            const hidden = r.changes.length - (r.visible ?? r.changes.length);
            return (
              <article className={`release${r.latest ? " latest" : ""}`} key={r.ver}>
                <div className="release__when">
                  <span className="release__ver">{r.ver}</span>
                  <span className="release__date">{r.date}</span>
                </div>
                <div className="release__body">
                  <h2 className="release__title">{r.title}</h2>
                  <p className="release__co">
                    <strong>{r.company}</strong>
                    <span className="muted">{r.location}</span>
                    {r.tag && <span className="tag">{r.tag}</span>}
                  </p>
                  <p className="release__summary">{r.summary}</p>
                  <ChangeList id={id} changes={r.changes} visible={r.visible} more={dict.ui.showMore(hidden)} collapse={dict.ui.collapse} />
                  {r.stack && (
                    <div className="release__stack">
                      {r.stack.map((s) => (
                        <span className="tag" key={s}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
