/**
 * Unlike layout.tsx, a template re-mounts on every navigation, so each new
 * page gets a short, plain fade-in (see `.page` in globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
