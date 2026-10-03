"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, pages, parsePath, type Locale } from "@/i18n/config";
import { TLink } from "./transition";

type Labels = {
  nav: Record<string, string>;
  brandAria: string;
  brandRole: string;
  navAria: string;
  mobileNav: string;
  themeToggle: string;
  openMenu: string;
  switchAria: string;
  city: string;
};

function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "de" : "en";
  const { slug } = parsePath(pathname);
  return (
    <TLink className="lang-switch" href={localePath(other, slug)} hrefLang={other} aria-label={label}>
      <span className={locale === "en" ? "on" : undefined}>EN</span>
      <span className={locale === "de" ? "on" : undefined}>DE</span>
    </TLink>
  );
}

function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("js-theme", next);
    } catch {}
  };
  return (
    <button className="icon-btn theme-btn" onClick={toggle} aria-label={label}>
      <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

export default function Header({ locale, labels }: { locale: Locale; labels: Labels }) {
  const pathname = usePathname();
  const { slug: current } = parsePath(pathname);
  const [open, setOpen] = useState(false);

  // Close the menu after navigating (state adjusted during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = pages.map((slug, i) => ({
    slug,
    href: localePath(locale, slug),
    name: labels.nav[slug],
    num: String(i + 1).padStart(2, "0"),
    current: slug === current,
  }));

  return (
    <>
      <header className="header">
        <div className="wrap header__inner">
          <TLink className="brand" href={localePath(locale)} aria-label={labels.brandAria}>
            <span className="brand__mark">js</span>
            <span className="brand__name">
              Janak Shrestha<small>{labels.brandRole}</small>
            </span>
          </TLink>
          <nav className="nav" aria-label={labels.navAria}>
            {links.map((l) => (
              <TLink key={l.slug} href={l.href} aria-current={l.current ? "page" : undefined}>
                <sup>{l.num}</sup>
                <span className="roll">
                  <span>{l.name}</span>
                  <span aria-hidden="true">{l.name}</span>
                </span>
              </TLink>
            ))}
          </nav>
          <div className="header__tools">
            <LangSwitch locale={locale} label={labels.switchAria} />
            <ThemeToggle label={labels.themeToggle} />
            <button
              className="icon-btn menu-btn"
              aria-label={labels.openMenu}
              aria-expanded={open}
              aria-controls="drawer"
              onClick={() => setOpen((o) => !o)}
            >
              <div>
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
        <div className="progress" />
      </header>

      <div className="drawer" id="drawer">
        <nav aria-label={labels.mobileNav}>
          {links.map((l) => (
            <TLink key={l.slug} href={l.href} aria-current={l.current ? "page" : undefined}>
              <sup>{l.num}</sup>
              {l.name}
            </TLink>
          ))}
        </nav>
        <div className="drawer__foot mono">
          <span>
            <span className="dot dot--inline" />
            {labels.city}
          </span>
          <LangSwitch locale={locale} label={labels.switchAria} />
        </div>
      </div>
    </>
  );
}
