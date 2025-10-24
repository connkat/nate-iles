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
      : pathname === "/writing"
      ? ["Nathan Iles", "Writer"]
      : pathname === "/projects"
      ? ["Nathan Iles", "Punk Rocker"]
      : ["Nate Iles", "Photographer", "Writer", "Punk Rocker"];
  const title = useScrambledSequence(texts, progress, { hold: 0.45 });
  const links = [
    { href: "/photography", label: "Photography" },
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-4 flex items-center justify-between">
      <Link href="/" className="hover:opacity-90 transition !no-underline">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
      </Link>
      <nav className="flex gap-2 text-sm">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={[
                "relative px-3 py-1 rounded-md transition",
                "!no-underline text-black/80 dark:text-white/80",
                "hover:bg-black/5 dark:hover:bg-white/5",
                // underline animation using after pseudo element
                "after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:bg-current",
                active
                  ? "font-semibold after:w-auto"
                  : "after:w-0 hover:after:w-[calc(100%-1.5rem)] after:transition-all after:duration-300",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
