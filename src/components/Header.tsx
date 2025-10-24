"use client";

import Link from "next/link";
import { useScrambledSequence, useScrollProgress } from "../hooks/useScramble";

export default function Header() {
  const progress = useScrollProgress(50, 300);
  const title = useScrambledSequence(
    ["Nate Iles", "Photographer", "Writer", "Punk Rocker"],
    progress,
    { hold: 0.45 } // hold the resolved word for ~45% of each segment
  );
  return (
    <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
        {title}
      </h1>
      <nav className="flex gap-5 text-sm">
        <Link href="/bio" className="hover:opacity-80">
          Bio
        </Link>
        <Link href="/photography" className="hover:opacity-80">
          Photography
        </Link>
        <Link href="/projects" className="hover:opacity-80">
          Projects
        </Link>
        <Link href="/writing" className="hover:opacity-80">
          Writing
        </Link>
      </nav>
    </div>
  );
}
