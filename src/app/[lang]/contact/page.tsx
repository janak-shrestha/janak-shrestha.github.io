import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/i18n/metadata";
import { person, socials } from "@/content/shared";
import Split from "@/components/Split";
import { ContactForm } from "@/components/forms";
import { CopyButton } from "@/components/widgets";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { locale, dict } = await getDictionary((await params).lang);
  return pageMetadata(locale, "contact", dict, "contact");
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { locale, dict } = await getDictionary((await params).lang);
  const t = dict.contact;
  const ui = dict.ui;

  return (
    <>
      <section className="page-hero wrap">
        <div className="page-hero__meta">
          <span className="eyebrow" data-reveal="fade">{t.eyebrow}</span>
          <span className="mono muted" data-reveal="fade">
            <span className="dot dot--inline" />
            {ui.city}
          </span>
        </div>
        <div className="page-hero__grid">
          <Split as="h1" className="display h1">{t.title}</Split>
          <p className="lead" data-reveal style={{ ["--d" as string]: ".25s" }}>{t.lead}</p>
        </div>
      </section>

      <section className="section--tight wrap section--flush-top">
        <div className="contact-grid">
          <div>
            <span className="eyebrow" data-reveal>{t.direct}</span>
            <div className="mail-row" data-reveal>
              <a className="mail link link--under" href={`mailto:${person.email}`}>
                {person.email}
              </a>
              <CopyButton value={person.email} label={ui.copy} done={ui.copied} />
            </div>
            <dl className="facts" data-reveal>
              {t.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <nav className="socials" aria-label={t.socialsAria} data-reveal>
              {socials.map((s) => (
                <a href={s.href} target="_blank" rel="noopener noreferrer" key={s.name}>
                  {s.name}
                  <span>{s.handle}</span>
                </a>
              ))}
            </nav>
          </div>

          <ContactForm
            labels={{ topicsLegend: t.topicsLegend, topics: t.topics, name: t.name, email: t.email, subject: t.subject, message: t.message, send: t.send }}
            messages={{ sending: ui.sending, sent: ui.sent, failed: ui.failed, sentToast: ui.sentToast }}
            language={locale === "de" ? "Deutsch" : "English"}
          />
        </div>
      </section>
    </>
  );
}
