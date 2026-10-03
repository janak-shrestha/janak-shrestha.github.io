"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { parsePath } from "@/i18n/config";

/* ---------- Rotating hero word ---------- */
export function HeroSwap({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || words.length < 2) return;
    const t = setInterval(() => {
      setI((cur) => {
        setPrev(cur);
        return (cur + 1) % words.length;
      });
    }, 2800);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className="hero__swap" aria-label={words.join(", ")}>
      {words.map((w, n) => (
        <span key={w} className={n === i ? "on" : n === prev ? "off" : undefined} aria-hidden="true">
          {w}
        </span>
      ))}
    </span>
  );
}

/* ---------- Career clock: shared by the hero counter and the footer ---------- */
function useElapsed(since: string) {
  const [parts, setParts] = useState<number[] | null>(null);
  useEffect(() => {
    const start = new Date(since).getTime();
    const tick = () => {
      let s = Math.floor((Date.now() - start) / 1000);
      const y = Math.floor(s / 31557600);
      s -= y * 31557600;
      const d = Math.floor(s / 86400);
      s -= d * 86400;
      const h = Math.floor(s / 3600);
      s -= h * 3600;
      const m = Math.floor(s / 60);
      setParts([y, d, h, m, s - m * 60]);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [since]);
  return parts;
}
const pad = (n: number, i: number) => (i >= 2 ? String(n).padStart(2, "0") : String(n));

export function CareerCounter({ since, units }: { since: string; units: string[] }) {
  const parts = useElapsed(since);
  return (
    <div className="counter-grid" aria-hidden="true">
      {units.map((u, i) => (
        <div key={u}>
          {/* key changes with the value so the tick animation replays */}
          <b key={parts ? parts[i] : "x"} className={parts ? "tick" : undefined}>
            {parts ? pad(parts[i], i) : "—"}
          </b>
          <span>{u}</span>
        </div>
      ))}
    </div>
  );
}

export function UptimeClock({ since, units }: { since: string; units: string[] }) {
  const parts = useElapsed(since);
  return <span className="uptime-clock">{parts ? parts.map((p, i) => pad(p, i) + units[i]).join(" ") : "—"}</span>;
}

/* ---------- Changelog entries with "show more" ---------- */
type Change = { kind: string; text: string };
export function ChangeList({ id, changes, visible, more, collapse }: { id: string; changes: Change[]; visible?: number; more: string; collapse: string }) {
  const [open, setOpen] = useState(false);
  const limit = visible ?? changes.length;
  const hidden = changes.length - limit;
  return (
    <>
      <ul className="changes" id={id}>
        {changes.map((c, n) => (
          <li key={n} hidden={!open && n >= limit} className={open && n >= limit ? "appear" : undefined} style={{ ["--n" as string]: n - limit }}>
            <span className={`kind kind--${c.kind}`}>{c.kind}</span>
            {c.text}
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button className="more-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <span>{open ? collapse : more}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </>
  );
}

/* ---------- Stack filter ---------- */
type Category = { id: string; groups: string[]; title: string; text: string; tools: { name: string; core?: boolean }[] };
export function StackGrid({ categories, filters, aria }: { categories: Category[]; filters: Record<string, string>; aria: string }) {
  const [filter, setFilter] = useState("all");
  return (
    <>
      <div className="filters" role="group" aria-label={aria} data-reveal>
        {Object.entries(filters).map(([key, label]) => (
          <button key={key} className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>
      <div className="stack">
        {categories.map((c, n) => (
          <div
            key={c.id}
            className={`cat${filter !== "all" && !c.groups.includes(filter) ? " dim" : ""}`}
            data-reveal
            style={{ ["--d" as string]: `${(n % 3) * 0.06}s` }}
          >
            <div className="cat__head">
              <h2 className="h3">{c.title}</h2>
              <span className="mono">{String(n + 1).padStart(2, "0")}</span>
            </div>
            <p className="muted">{c.text}</p>
            <div className="cat__tools">
              {c.tools.map((t) => (
                <span key={t.name} className={`tool${t.core ? " core" : ""}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------- Toast + copy button ---------- */
const ToastContext = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const toast = (m: string) => {
    setMsg(m);
    setShow(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShow(false), 2200);
  };
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">
        {msg}
      </div>
    </ToastContext.Provider>
  );
}

export function CopyButton({ value, label, done }: { value: string; label: string; done: string }) {
  const toast = useToast();
  return (
    <button
      className="copy-btn"
      onClick={() =>
        navigator.clipboard?.writeText(value).then(
          () => toast(`${done}: ${value}`),
          () => toast(value)
        )
      }
    >
      {label}
    </button>
  );
}

/* ---------- Footer call to action (not shown on the contact page itself) ---------- */
export function HideOnContact({ children }: { children: React.ReactNode }) {
  const { slug } = parsePath(usePathname());
  return slug === "contact" ? null : <>{children}</>;
}
