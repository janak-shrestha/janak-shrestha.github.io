import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import Split from "@/components/Split";
import Cover from "@/components/Covers";
import { NotifyForm } from "@/components/forms";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "blog", dict, "blog");
}

export default async function Blog({ params }: PageProps<"/[lang]/blog">) {
  const { locale, dict } = await getDictionary((await params).lang);
  const t = dict.blog;
  const ui = dict.ui;

  return (
    <>
      <section className="page-hero wrap">
        <div className="page-hero__meta">
          <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
          <span className="mono muted" data-reveal="fade">
            <span className="dot dot--warn dot--inline" />
            {t.status}
          </span>
        </div>
        <div className="page-hero__grid">
          <Split as="h1" className="display h1">{t.title}</Split>
          <p className="lead" data-reveal style={{ ["--d" as string]: ".25s" }}>{t.lead}</p>
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <div className="pipeline" data-reveal aria-label={t.pipeline.aria}>
          <div className="pipeline__head">
            <span className="mono">{t.pipeline.name}</span>
            <span className="mono muted">{t.pipeline.run}</span>
          </div>
          <ol className="pipeline__stages">
            {t.pipeline.stages.map(([name, state, kind]) => (
              <li className={kind} key={name}>
                <span className="st" />
                <div>
                  <strong>{name}</strong>
                  <span>{state}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <div>
            <span className="num">{t.queue.num}</span>
            <Split className="h2">{t.queue.title}</Split>
          </div>
          <p className="lead" data-reveal>{t.queue.lead}</p>
        </div>
        <div className="posts">
          {t.posts.map((p, i) => (
            <article className="post" data-reveal style={{ ["--d" as string]: `${(i % 3) * 0.08}s` }} key={p.cover}>
              <figure className="post__cover">
                <Cover name={p.cover} />
              </figure>
              <div className="post__body">
                <div className="post__meta">
                  <span className="tag">{p.tag}</span>
                  <span className={`state${p.state.tone ? ` state--${p.state.tone}` : ""}`}>{p.state.label}</span>
                </div>
                <h3 className="h3">{p.title}</h3>
                <p className="muted">{p.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <div className="notify" data-reveal>
          <div>
            <span className="eyebrow">{t.notify.eyebrow}</span>
            <Split className="h2" style={{ marginTop: 16 }}>{t.notify.title}</Split>
            <p className="muted notify__text">{t.notify.text}</p>
          </div>
          <NotifyForm
            label={t.notify.label}
            button={t.notify.button}
            success={t.notify.success}
            messages={{ sending: ui.sending, sent: ui.sent, failed: ui.failed, sentToast: ui.sentToast }}
            language={locale === "de" ? "Deutsch" : "English"}
          />
        </div>
      </section>
    </>
  );
}
