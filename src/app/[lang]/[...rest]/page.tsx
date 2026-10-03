import { notFound } from "next/navigation";

/** Any URL that doesn't match a page renders [lang]/not-found.tsx with the site layout. */
export default function CatchAll() {
  notFound();
}
