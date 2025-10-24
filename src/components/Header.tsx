"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrambledSequence, useScrollProgress } from "../hooks/useScramble";

export default function Header() {
  const pathname = usePathname();
  const progress = useScrollProgress(50, 300);
  const texts =
    pathname === "/photography"
      ? ["Nathan Iles", "Photographer"]
      : ["Nate Iles", "Photographer", "Writer", "Punk Rocker"];
  const title = useScrambledSequence(texts, progress, { hold: 0.45 });
  return (
    <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
      <Link href="/" className="hover:opacity-90 transition !no-underline">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
      </Link>
      <nav className="flex gap-5 text-sm">
        <Link href="/bio" className="hover:opacity-80">
          Bio
        </Link>
        <Link href="/photography" className="hover:opacity-80">
          Photography
        </Link>
        <Link href="/writing" className="hover:opacity-80">
          Writing
        </Link>
        <Link href="/projects" className="hover:opacity-80">
          Projects
        </Link>
      </nav>
    </div>
  );
}
