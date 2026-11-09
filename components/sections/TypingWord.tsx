"use client";
import { useEffect, useState } from "react";

const TYPE_MS = 110;
const DELETE_MS = 60;
const HOLD_MS = 1800;
const GAP_MS = 500;

// Types each word in turn, holds, deletes it, then moves to the next (no caret). The longest word is rendered invisibly to hold the layout.
export default function TypingWord({ words, startDelay = 1500 }: { words: string[]; startDelay?: number }) {
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = (typing: boolean) => {
      n += typing ? 1 : -1;
      setCount(n);
      if (typing && n === words[i].length) timer = setTimeout(() => step(false), HOLD_MS);
      else if (!typing && n === 0) {
        i = (i + 1) % words.length;
        setIndex(i);
        timer = setTimeout(() => step(true), GAP_MS);
      } else timer = setTimeout(() => step(typing), typing ? TYPE_MS : DELETE_MS);
    };
    timer = setTimeout(() => {
      if (reduced) setCount(words[0].length);
      else step(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [words, startDelay]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));
  return (
    <span className="relative inline-block whitespace-nowrap">
      <span className="invisible" aria-hidden="true">{longest}</span>
      <span className="absolute left-0 top-0" aria-label={words[index]}>
        {words[index].slice(0, count)}
      </span>
    </span>
  );
}
