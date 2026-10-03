import { localePath, pages, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/content/en";
import { person, socials } from "@/content/shared";
import Split from "./Split";
import Link from "next/link";
import { HideOnContact, UptimeClock } from "./widgets";
import { Arrow } from "./icons";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ui = dict.ui;
  return (
    <footer className="footer">
      <div className="wrap">
        <HideOnContact>
          <div className="footer__cta">
            <Split as="h2" className="display">{ui.ctaHeading}</Split>
            <Link className="btn btn--solid" href={localePath(locale, "contact")}>
              {ui.ctaButton} <Arrow />
            </Link>
          </div>
        </HideOnContact>
        <div className="footer__grid">
          <div>
            <h4>{ui.status}</h4>
            <p>
              <span className="dot dot--inline" />
              {ui.operational}
            </p>
            <p className="muted footer__uptime">
              {ui.uptime} <UptimeClock since={person.careerStart} units={ui.clockUnits} />
            </p>
          </div>
          <div>
            <h4>{ui.pages}</h4>
            <ul>
              {pages.map((slug) => (
                <li key={slug}>
                  <Link className="link" href={localePath(locale, slug)}>
                    {dict.nav[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{ui.elsewhere}</h4>
            <ul>
              {socials.map((s) => (
                <li key={s.name}>
                  <a className="link" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{ui.resources}</h4>
            <ul>
              <li>
                <a className="link" href={person.cv} download>
                  {ui.cvDownload}
                </a>
              </li>
              <li>
                <a className="link" href={`mailto:${person.email}`}>
                  {ui.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>
            &copy; {new Date().getFullYear()} Janak Shrestha · {ui.rights}
          </span>
          <span>{ui.coords}</span>
        </div>
      </div>
    </footer>
  );
}
