"use client";
import { useEffect, useState } from "react";

const TYPE_MS = 110;
const DELETE_MS = 60;
const HOLD_MS = 1800;
const GAP_MS = 500;

// Types the word, holds, deletes it, and starts again (no caret). Full text is rendered invisibly to hold the layout.
export default function TypingWord({ text, startDelay = 1500 }: { text: string; startDelay?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = (typing: boolean) => {
      n += typing ? 1 : -1;
      setCount(n);
      if (typing && n === text.length) timer = setTimeout(() => step(false), HOLD_MS);
      else if (!typing && n === 0) timer = setTimeout(() => step(true), GAP_MS);
      else timer = setTimeout(() => step(typing), typing ? TYPE_MS : DELETE_MS);
    };
    timer = setTimeout(() => {
      if (reduced) setCount(text.length);
      else step(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay]);

  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible" aria-hidden="true">{text}</span>
      <span className="absolute left-0 top-0" aria-label={text}>
        {text.slice(0, count)}
      </span>
    </span>
  );
}
