import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import { locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Effects from "@/components/Effects";
import { ToastProvider } from "@/components/widgets";
import "../globals.css";

const display = Fraunces({ subsets: ["latin", "latin-ext"], axes: ["opsz", "SOFT"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-mono" });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Janak Shrestha", template: "%s · Janak Shrestha" },
  authors: [{ name: "Janak Shrestha" }],
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1eee8" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

// Applies the saved theme before first paint so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem("js-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const { locale, dict } = await getDictionary(lang);
  const ui = dict.ui;

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {ui.skip}
        </a>
        <ToastProvider>
          <Header
            locale={locale}
            labels={{
              nav: dict.nav,
              brandAria: ui.brandAria,
              brandRole: ui.brandRole,
              navAria: ui.navAria,
              mobileNav: ui.mobileNav,
              themeToggle: ui.themeToggle,
              openMenu: ui.openMenu,
              switchAria: ui.switchAria,
              city: ui.city,
            }}
          />
          <main id="main">{children}</main>
          <Footer locale={locale} dict={dict} />
          <Effects />
        </ToastProvider>
      </body>
    </html>
  );
}
