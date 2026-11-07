import { Fragment } from "react";

/* Renders copy with inline markup: *pixel accent* and ~gradient keyword~. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*|~[^~]+~)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={i} className="pixel text-accent">
              {part.slice(1, -1)}
            </span>
          );
        }
        if (part.startsWith("~") && part.endsWith("~")) {
          return (
            <span key={i} className="text-keyword">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
