import { useEffect, useMemo, useRef, useState } from "react";

export function useScrollProgress(start = 50, end = 400) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const p = clamp((y - start) / (end - start), 0, 1);
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [start, end]);

  return progress;
}

export function useScrambledTitle(initialText: string, targetText: string, progress: number) {
  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", []);
  const [text, setText] = useState(initialText);
  const lastProgress = useRef<number>(-1);

  useEffect(() => {
    if (progress === lastProgress.current) return;
    lastProgress.current = progress;

    const from = initialText;
    const to = targetText;
    const maxLen = Math.max(from.length, to.length);
    const revealCount = Math.floor(progress * to.length);

    let next = "";
    for (let i = 0; i < maxLen; i++) {
      const targetChar = to[i] ?? "";
      const fromChar = from[i] ?? "";

      if (i < revealCount) {
        next += targetChar;
      } else {
        if (targetChar === " " || fromChar === " ") {
          next += targetChar || fromChar;
        } else {
          const r = Math.floor(Math.random() * chars.length);
          next += chars[r];
        }
      }
    }

    if (progress <= 0) setText(initialText);
    else if (progress >= 1) setText(targetText);
    else setText(next);
  }, [chars, initialText, targetText, progress]);

  return text;
}
