"use client";

import Link from "next/link";
import { useScrambledTitle, useScrollProgress } from "../hooks/useScramble";

export default function Header() {
	const progress = useScrollProgress(50, 400);
  const title = useScrambledTitle("Nate Iles", "photographer", progress);
  return (
    <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight" aria-label={progress < 1 ? "Nate Iles" : "photographer"}>
          {title}
        </h1>
      <nav className="flex gap-5 text-sm">
        <Link href="/bio" className="hover:opacity-80">Bio</Link>
        <Link href="/photography" className="hover:opacity-80">Photography</Link>
        <Link href="/projects" className="hover:opacity-80">Projects</Link>
        <Link href="/writing" className="hover:opacity-80">Writing</Link>
      </nav>
    </div>
  );
}
