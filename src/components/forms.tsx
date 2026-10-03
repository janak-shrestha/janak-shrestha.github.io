"use client";

import { useState, type FormEvent } from "react";
import { useToast } from "./widgets";

/**
 * Both forms post to the site's own /api/contact route. The Formspree
 * endpoint is only known to the server (FORMSPREE_ENDPOINT) and never
 * appears in the browser.
 */
type Status = { tone: "" | "ok" | "err"; text: string };
type Messages = { sending: string; sent: string; failed: string; sentToast: string };

function useSubmit(kind: "contact" | "notify", messages: Messages, success?: string) {
  const toast = useToast();
  const [status, setStatus] = useState<Status>({ tone: "", text: "" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setBusy(true);
    setStatus({ tone: "", text: messages.sending });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ tone: "ok", text: success ?? messages.sent });
      toast(messages.sentToast);
      return true;
    } catch {
      setStatus({ tone: "err", text: messages.failed });
      return false;
    } finally {
      setBusy(false);
    }
  }
  return { status, busy, onSubmit };
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Hidden field that only bots fill in. */
const Honeypot = () => (
  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
);

type ContactLabels = {
  topicsLegend: string;
  topics: string[];
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
};

export function ContactForm({ labels, messages, language }: { labels: ContactLabels; messages: Messages; language: string }) {
  const { status, busy, onSubmit } = useSubmit("contact", messages);
  const [count, setCount] = useState(0);
  return (
    <form className="form" onSubmit={async (e) => (await onSubmit(e)) && setCount(0)} data-reveal style={{ ["--d" as string]: ".15s" }}>
      <fieldset className="topics">
        <legend>{labels.topicsLegend}</legend>
        {labels.topics.map((t, i) => (
          <span key={t}>
            <input type="radio" name="topic" id={`t${i}`} value={t} defaultChecked={i === 0} />
            <label htmlFor={`t${i}`}>{t}</label>
          </span>
        ))}
      </fieldset>
      <div className="form__row">
        <div className="field">
          <input type="text" id="f-name" name="name" placeholder=" " autoComplete="name" required maxLength={120} />
          <label htmlFor="f-name">{labels.name}</label>
        </div>
        <div className="field">
          <input type="email" id="f-email" name="email" placeholder=" " autoComplete="email" required maxLength={200} />
          <label htmlFor="f-email">{labels.email}</label>
        </div>
      </div>
      <div className="field">
        <input type="text" id="f-subject" name="subject" placeholder=" " required maxLength={200} />
        <label htmlFor="f-subject">{labels.subject}</label>
      </div>
      <div className="field">
        <textarea id="f-msg" name="message" placeholder=" " maxLength={2000} rows={5} required onChange={(e) => setCount(e.target.value.length)} />
        <label htmlFor="f-msg">{labels.message}</label>
        <span className="counter">{count} / 2000</span>
      </div>
      <input type="hidden" name="language" value={language} />
      <Honeypot />
      <div className="form__foot">
        <span className={`form__status ${status.tone}`} role="status" aria-live="polite">
          {status.text}
        </span>
        <button className="btn btn--solid" type="submit" disabled={busy}>
          {labels.send} <Arrow />
        </button>
      </div>
    </form>
  );
}

export function NotifyForm({ label, button, success, messages, language }: { label: string; button: string; success: string; messages: Messages; language: string }) {
  const { status, busy, onSubmit } = useSubmit("notify", messages, success);
  return (
    <form className="notify__form" onSubmit={onSubmit}>
      <div className="field">
        <input type="email" id="n-email" name="email" placeholder=" " autoComplete="email" required maxLength={200} />
        <label htmlFor="n-email">{label}</label>
      </div>
      <input type="hidden" name="language" value={language} />
      <Honeypot />
      <div className="form__foot">
        <span className={`form__status ${status.tone}`} role="status" aria-live="polite">
          {status.text}
        </span>
        <button className="btn btn--solid" type="submit" disabled={busy}>
          {button} <Arrow />
        </button>
      </div>
    </form>
  );
}
