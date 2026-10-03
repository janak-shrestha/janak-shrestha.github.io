import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { person } from "@/content/shared";
import Split from "@/components/Split";
import { Arrow } from "@/components/icons";
import photo from "../../../../public/images/profile.jpeg";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "about", dict, "about");
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { dict } = await getDictionary((await params).lang);
  const t = dict.about;

  return (
    <>
      <section className="page-hero wrap">
        <div className="page-hero__meta">
          <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
          <span className="mono muted" data-reveal="fade">{t.meta}</span>
        </div>
        <div className="page-hero__grid">
          <Split as="h1" className="display h1">{t.title}</Split>
          <p className="lead" data-reveal style={{ ["--d" as string]: ".25s" }}>{t.lead}</p>
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <div className="about-grid">
          <div className="sticky">
            <figure className="portrait">
              <Image src={photo} alt={t.photoAlt} sizes="(max-width: 900px) 100vw, 40vw" placeholder="blur" />
              <figcaption>{t.photoCaption}</figcaption>
            </figure>
            <dl className="facts" data-reveal>
              {t.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="prose">
            {t.prose.map((p, i) => (
              <p data-reveal key={i}>{p}</p>
            ))}
            <div className="btn-row" data-reveal>
              <a className="btn btn--solid" href={person.cv} download>
                {t.cvButton} <Arrow />
              </a>
              <a className="btn btn--ghost" href="https://de.linkedin.com/in/janak-shrestha" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="num">{t.principles.num}</span>
            <Split className="h2">{t.principles.title}</Split>
          </div>
          <p className="lead" data-reveal>{t.principles.lead}</p>
        </div>
        <div className="principles">
          {t.principles.items.map(([title, text], i) => (
            <article className="principle" data-reveal style={{ ["--d" as string]: `${(i % 2) * 0.08}s` }} key={title}>
              <span className="mono">P—0{i + 1}</span>
              <h3 className="h3">{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap section--flush-top">
        <div className="section-head">
          <div>
            <span className="num">{t.education.num}</span>
            <Split className="h2">{t.education.title}</Split>
          </div>
        </div>
        <div className="edu">
          {t.education.items.map((e, i) => (
            <article data-reveal style={{ ["--d" as string]: `${i * 0.1}s` }} key={e.title}>
              <span className="mono muted">{e.meta}</span>
              <h3 className="h3">{e.title}</h3>
              <p className="muted">{e.text}</p>
              <span className="big" aria-hidden="true">{e.mark}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
