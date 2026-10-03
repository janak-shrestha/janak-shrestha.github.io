import Image from "next/image";
import { getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/config";
import { pageMetadata } from "@/i18n/metadata";
import { person } from "@/content/shared";
import Split from "@/components/Split";
import Link from "next/link";
import { CareerCounter, HeroSwap } from "@/components/widgets";
import { Arrow } from "@/components/icons";
import photo from "../../../public/images/profile.jpeg";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "", dict, "home");
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { locale, dict } = await getDictionary((await params).lang);
  const t = dict.home;
  const nav = dict.nav;
  const cards: { slug: "about" | "experience" | "stack" | "blog" | "contact"; num: string }[] = [
    { slug: "about", num: "02" },
    { slug: "experience", num: "03" },
    { slug: "stack", num: "04" },
    { slug: "blog", num: "05" },
    { slug: "contact", num: "06" },
  ];

  return (
    <>
      <section className="hero wrap">
        <div>
          <div className="hero__top">
            <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
            <span className="mono muted" data-reveal="fade">{t.edition}</span>
          </div>
          <Split as="h1" className="display h1 hero__title">
            <span className="line">{t.titleLead}</span>{" "}
            <span className="line indent">
              {t.titleIndent} <HeroSwap words={t.swap} />
            </span>
          </Split>
        </div>

        <div className="hero__bottom">
          <div className="hero__intro">
            <p className="lead" data-reveal style={{ ["--d" as string]: ".3s" }}>{t.intro}</p>
            <div className="hero__ctas" data-reveal style={{ ["--d" as string]: ".4s" }}>
              <Link className="btn btn--solid" href={localePath(locale, "experience")}>
                {t.ctaPrimary} <Arrow />
              </Link>
              <a className="btn btn--ghost" href={person.cv} download>
                {t.ctaCv}
              </a>
            </div>
          </div>

          <aside className="card" data-reveal style={{ ["--d" as string]: ".5s" }} aria-label={t.card.aria}>
            <div className="card__top">
              <span className="card__label">
                <span className="dot" />
                {t.card.label}
              </span>
              <CareerCounter since={person.careerStart} units={t.card.units} />
              <p className="card__note">{t.card.note}</p>
            </div>
            <dl>
              {t.card.rows.map(([k, v]) => (
                <div className="card__row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section className="band" aria-label={t.band.aria}>
        <Image src={photo} alt={t.band.alt} sizes="100vw" placeholder="blur" />
        <div className="wrap band__caption">
          <Split as="p" className="display">{t.band.caption}</Split>
          <span className="mono">{t.band.place}</span>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="num">{t.numbers.num}</span>
            <Split className="h2">{t.numbers.title}</Split>
          </div>
          <p className="lead" data-reveal>{t.numbers.lead}</p>
        </div>
        <div className="stats">
          {t.numbers.stats.map((s, i) => (
            <div className="stat" data-reveal style={{ ["--d" as string]: `${i * 0.08}s` }} key={i}>
              <div className="stat__n" data-count={s.n}>
                <span className="v">0</span>
                {s.plus && <sup>+</sup>}
              </div>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap section--flush-top">
        <div className="section-head">
          <div>
            <span className="num">{t.services.num}</span>
            <Split className="h2">{t.services.title}</Split>
          </div>
          <p className="lead" data-reveal>{t.services.lead}</p>
        </div>
        <div className="rows">
          {t.services.rows.map((r, i) => (
            <article className="row" tabIndex={0} data-reveal key={r.title}>
              <span className="row__idx">S—0{i + 1}</span>
              <div>
                <h3 className="row__title">{r.title}</h3>
                <div className="row__body">
                  <div>
                    <p>{r.text}</p>
                    <div className="row__tags">
                      {r.tags.map((tag) => (
                        <span className="tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <span className="row__arrow">
                <Arrow />
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight wrap">
        <div className="now">
          <div>
            <span className="eyebrow" data-reveal>{t.now.eyebrow}</span>
            <Split className="h2" style={{ marginTop: 18 }}>{t.now.title}</Split>
          </div>
          <div className="now__card" data-reveal>
            <span className="mono muted">{t.now.meta}</span>
            <h3 className="h3">{t.now.heading}</h3>
            <p className="muted">{t.now.text}</p>
            <ul className="now__list">
              {t.now.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="num">{t.index.num}</span>
            <Split className="h2">{t.index.title}</Split>
          </div>
        </div>
        <nav className="index" aria-label={t.index.aria}>
          {cards.map((c, i) => (
            <Link key={c.slug} href={localePath(locale, c.slug)} data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }}>
              <span className="mono">
                {c.num} / {nav[c.slug]}
              </span>
              <div className="index__foot">
                <div>
                  <h3 className="h3">{t.index.cards[c.slug][0]}</h3>
                  <p className="muted">{t.index.cards[c.slug][1]}</p>
                </div>
                <Arrow />
              </div>
            </Link>
          ))}
          <a href={person.cv} download data-reveal style={{ ["--d" as string]: ".16s" }}>
            <span className="mono">PDF / CV</span>
            <div className="index__foot">
              <div>
                <h3 className="h3">{t.index.cards.cv[0]}</h3>
                <p className="muted">{t.index.cards.cv[1]}</p>
              </div>
              <Arrow />
            </div>
          </a>
        </nav>
      </section>
    </>
  );
}
