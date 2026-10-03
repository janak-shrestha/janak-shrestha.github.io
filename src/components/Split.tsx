import { Children, Fragment, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Wraps every word in a masked span so headings can rise in word by word
 * (see `.split` in globals.css). Inline elements such as <em> keep their
 * styling; component elements (e.g. the rotating hero word) are kept whole.
 */
function splitNode(node: ReactNode, counter: { i: number }, keyPrefix: string): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, n) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return " ";
      const i = counter.i++;
      return (
        <span className="w" key={`${keyPrefix}-${n}`}>
          <span style={{ ["--i" as string]: i }}>{part}</span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((child, n) => splitNode(child, counter, `${keyPrefix}.${n}`));
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (typeof el.type === "string") {
      if (el.type === "br") return el;
      return cloneElement(el, { key: keyPrefix }, splitNode(el.props.children, counter, keyPrefix));
    }
    // Fragments: flatten their children.
    if (el.type === Fragment) {
      return Children.toArray(el.props.children).map((c, n) => splitNode(c, counter, `${keyPrefix}.${n}`));
    }
    const i = counter.i++;
    return (
      <span className="w w--swap" key={keyPrefix}>
        <span style={{ ["--i" as string]: i }}>{el}</span>
      </span>
    );
  }
  return node;
}

type SplitProps = {
  as?: "h1" | "h2" | "p";
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
};

export default function Split({ as: Tag = "h2", className = "", children, style }: SplitProps) {
  return (
    <Tag className={`split ${className}`.trim()} style={style}>
      {splitNode(children, { i: 0 }, "s")}
    </Tag>
  );
}
