"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel) as NodeListOf<T>);

/** Animates `[data-count]` numbers from 0 to their target once. */
function countUp(scope: Element, reduce: boolean) {
  const els = scope.matches("[data-count]") ? [scope] : Array.from(scope.querySelectorAll("[data-count]"));
  els.forEach((el) => {
    const host = el as HTMLElement;
    if (host.dataset.done) return;
    host.dataset.done = "1";
    const target = Number(host.dataset.count);
    const out = host.querySelector(".v") ?? host;
    if (reduce) {
      out.textContent = String(target);
      return;
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      out.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/**
 * Page-level effects for server-rendered markup: scroll reveals, counters,
 * header state, scroll progress, photo parallax and the changelog rail.
 * Re-runs on every route change so new pages are wired up.
 */
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // Reveal on scroll
    const targets = $$("[data-reveal], .split, .release, .portrait, .stats");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("in");
            countUp(en.target, reduce);
            io?.unobserve(en.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      );
      targets.forEach((el) => io!.observe(el));
    } else {
      targets.forEach((el) => {
        el.classList.add("in");
        countUp(el, true);
      });
    }

    // Scroll-driven bits
    const header = document.querySelector<HTMLElement>(".header");
    const progress = document.querySelector<HTMLElement>(".progress");
    const bands = $$<HTMLImageElement>(".band img");
    const log = document.querySelector<HTMLElement>(".log");
    const rail = document.querySelector<HTMLElement>(".log__rail i");
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      if (header) {
        header.classList.toggle("is-scrolled", y > 24);
        const hide = y > 400 && y > lastY + 4 && !root.classList.contains("menu-open");
        if (hide) header.classList.add("is-hidden");
        else if (y < lastY - 4 || y < 400) header.classList.remove("is-hidden");
      }
      if (progress) {
        const max = root.scrollHeight - window.innerHeight;
        progress.style.setProperty("--p", max > 0 ? (y / max).toFixed(4) : "0");
      }
      if (!reduce) {
        bands.forEach((img) => {
          const r = img.parentElement!.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) return;
          const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          img.style.setProperty("--py", `${(c * -50).toFixed(1)}px`);
        });
      }
      if (log && rail) {
        const r = log.getBoundingClientRect();
        const p = (window.innerHeight * 0.55 - r.top) / r.height;
        rail.style.setProperty("--lp", Math.max(0, Math.min(1, p)).toFixed(4));
      }
      lastY = y;
      ticking = false;
    };
    const onScrollRaf = () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    onScroll();

    // Service rows: tap to expand on touch devices
    const rows = $$(".row");
    const onRowClick = (e: Event) => {
      if (window.matchMedia("(hover: hover)").matches) return;
      const row = e.currentTarget as HTMLElement;
      const was = row.classList.contains("open");
      rows.forEach((r) => r.classList.remove("open"));
      if (!was) row.classList.add("open");
    };
    rows.forEach((r) => r.addEventListener("click", onRowClick));

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScrollRaf);
      rows.forEach((r) => r.removeEventListener("click", onRowClick));
    };
  }, [pathname]);

  return null;
}
