import type { Post } from "@/content/en";

/** Blog cover illustrations, coloured through the site's theme tokens (see `.cover` in globals.css). */
const covers: Record<Post["cover"], { label: string; body: React.ReactNode }> = {
  eks: {
    label: "Stacked environment layers built from one module",
    body: (
      <>
        <g className="cv-grid"><path d="M0 60h400M0 120h400M0 180h400M80 0v240M160 0v240M240 0v240M320 0v240" /></g>
        <g className="cv-float">
          <path className="cv-plate" d="M200 168l92-34-92-34-92 34z" />
          <path className="cv-plate" d="M200 146l92-34-92-34-92 34z" />
          <path className="cv-plate" d="M200 124l92-34-92-34-92 34z" />
          <path className="cv-plate cv-plate--acc" d="M200 102l92-34-92-34-92 34z" />
        </g>
        <g className="cv-label">
          <text x="310" y="72">prod</text><text x="310" y="94">test</text><text x="310" y="116">int</text><text x="310" y="138">dev</text>
        </g>
      </>
    ),
  },
  pci: {
    label: "A shield over a cluster grid",
    body: (
      <>
        <g className="cv-dots">
          {[70, 110, 290, 330].flatMap((x) => [60, 100, 140, 180].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />))}
        </g>
        <g className="cv-float">
          <path className="cv-shield" d="M200 40l62 22v48c0 40-28 70-62 86-34-16-62-46-62-86V62z" />
          <path className="cv-check" d="M174 118l18 18 36-40" />
        </g>
      </>
    ),
  },
  monolith: {
    label: "One large block splitting into many small services",
    body: (
      <>
        <rect className="cv-block" x="48" y="62" width="104" height="116" rx="4" />
        <g className="cv-flow"><path d="M164 120h40M204 120c20 0 20-52 44-52M204 120c20 0 20 52 44 52M204 120h44" /></g>
        <g className="cv-float">
          {[[256, 48], [306, 48, 1], [256, 100, 1], [306, 100], [256, 152], [306, 152]].map(([x, y, acc]) => (
            <rect key={`${x}-${y}`} className={`cv-svc${acc ? " cv-svc--acc" : ""}`} x={x} y={y} width="40" height="40" rx="4" />
          ))}
        </g>
      </>
    ),
  },
  oncall: {
    label: "A calm night-time signal with a single resolved spike",
    body: (
      <>
        <circle className="cv-moon" cx="318" cy="64" r="26" />
        <circle className="cv-moon-cut" cx="332" cy="54" r="24" />
        <g className="cv-grid"><path d="M0 180h400" /></g>
        <path className="cv-signal" d="M24 150h120l14-48 16 82 14-34h188" />
        <circle className="cv-ping" cx="174" cy="184" r="5" />
      </>
    ),
  },
  logging: {
    label: "Many log streams converging into one searchable store",
    body: (
      <>
        <g className="cv-streams">
          <path d="M24 40c120 0 120 80 220 80" /><path d="M24 80c120 0 120 40 220 40" /><path d="M24 120h220" />
          <path d="M24 160c120 0 120-40 220-40" /><path d="M24 200c120 0 120-80 220-80" />
        </g>
        <g className="cv-float">
          <ellipse className="cv-db" cx="306" cy="84" rx="44" ry="14" />
          <path className="cv-db" d="M262 84v72c0 8 20 14 44 14s44-6 44-14V84" />
          <path className="cv-db-line" d="M262 108c0 8 20 14 44 14s44-6 44-14M262 132c0 8 20 14 44 14s44-6 44-14" />
        </g>
      </>
    ),
  },
  sdn: {
    label: "A software-defined network of connected nodes",
    body: (
      <>
        <g className="cv-edges"><path d="M200 120L110 64M200 120L104 176M200 120L296 60M200 120L300 178M110 64L296 60M104 176L300 178M110 64L104 176M296 60L300 178" /></g>
        <g className="cv-float">
          <circle className="cv-node" cx="110" cy="64" r="14" /><circle className="cv-node" cx="104" cy="176" r="14" />
          <circle className="cv-node" cx="296" cy="60" r="14" /><circle className="cv-node" cx="300" cy="178" r="14" />
          <rect className="cv-node cv-node--acc" x="180" y="100" width="40" height="40" rx="8" />
        </g>
      </>
    ),
  },
};

export default function Cover({ name }: { name: Post["cover"] }) {
  const c = covers[name];
  return (
    <svg className="cover" viewBox="0 0 400 240" role="img" aria-label={c.label}>
      <rect className="cv-bg" width="400" height="240" />
      {c.body}
    </svg>
  );
}
