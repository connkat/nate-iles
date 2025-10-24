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

// Internal helper to generate one scramble step between two strings
function scrambleBetween(from: string, to: string, revealProgress: number, chars: string): string {
  const maxLen = Math.max(from.length, to.length);
  const revealCount = Math.floor(revealProgress * to.length);
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
  return next;
}

// Multi-stage scramble across an array of texts. Progress 0..1 spans all stages evenly.
export function useScrambledSequence(
  texts: string[],
  progress: number,
  options?: { hold?: number }
) {
  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", []);
  const safeTexts = useMemo(() => (texts && texts.length > 0 ? texts : [""]), [texts]);
  const [text, setText] = useState(safeTexts[0]);
  const last = useRef<number>(-1);
  const hold = Math.max(0, Math.min(0.8, options?.hold ?? 0.25)); // portion of each segment spent holding the resolved word

  useEffect(() => {
    if (!safeTexts.length) return;
    if (progress === last.current && text.length > 0) return;
    last.current = progress;

    const n = safeTexts.length;
    if (progress <= 0) {
      setText(safeTexts[0]);
      return;
    }
    if (progress >= 1) {
      setText(safeTexts[n - 1]);
      return;
    }

    const segments = n - 1;
    const pos = progress * segments; // 0..segments
    const idx = Math.floor(pos); // 0..segments-1
    const local = pos - idx; // 0..1 within this segment
    const from = safeTexts[idx];
    const to = safeTexts[idx + 1];

    // Map segment so last `hold` fraction is a full hold on the target word
    if (local >= 1 - hold) {
      setText(to);
    } else {
      const reveal = (local / (1 - hold));
      const next = scrambleBetween(from, to, reveal, chars);
      setText(next);
    }
  }, [chars, progress, safeTexts, text.length, hold]);

  // keep state in sync if texts array changes drastically while progress is 0 or 1
  useEffect(() => {
    if (progress <= 0) setText(safeTexts[0]);
    else if (progress >= 1) setText(safeTexts[safeTexts.length - 1]);
  }, [safeTexts, progress]);

  return text;
}
