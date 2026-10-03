"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps } from "react";

/**
 * Page transition: a single plain panel swipes in from the left, the route
 * changes underneath it, and the panel continues out to the right.
 */
const COVER_MS = 420;
const REVEAL_MS = 460;

type Phase = "idle" | "cover" | "reveal";
const TransitionContext = createContext<{ navigate: (href: string) => void }>({ navigate: () => {} });

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const finish = useCallback(() => {
    pending.current = null;
    requestAnimationFrame(() => setPhase("reveal"));
    later(() => setPhase("idle"), REVEAL_MS + 40);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = new URL(href, window.location.href);
      const samePage = target.pathname === window.location.pathname;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (samePage || reduced || pending.current) {
        router.push(href);
        return;
      }
      pending.current = target.pathname;
      setPhase("cover");
      later(() => router.push(href), COVER_MS);
      // Safety net: never leave the page covered if navigation stalls.
      later(() => {
        if (pending.current) finish();
      }, COVER_MS + 4000);
    },
    [router, finish]
  );

  // The new route has rendered: swipe the panel away.
  useEffect(() => {
    if (pending.current && pending.current === pathname) finish();
  }, [pathname, finish]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div className={`swipe swipe--${phase}`} aria-hidden="true" />
    </TransitionContext.Provider>
  );
}

/** next/link with the swipe transition. Modifier-clicks and new tabs behave normally. */
export function TLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { navigate } = useContext(TransitionContext);
  return (
    <Link
      href={href}
      {...props}
      onClick={onClick}
      onNavigate={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
