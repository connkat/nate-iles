"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrambledSequence, useScrollProgress } from "../hooks/useScramble";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const progress = useScrollProgress(50, 300);
  const [open, setOpen] = useState(false);
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
		{ href: "/contact", label: "Contact" },

  ];

  return (
    <div className="sticky top-0 z-50 px-2 sm:px-3 md:px-4 lg:px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Link href="/" className="hover:opacity-90 transition !no-underline">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
          {title}
        </h1>
      </Link>
      {/* Desktop nav */}
      <nav className="hidden sm:flex gap-2 text-sm">
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

      {/* Mobile hamburger */}
      <button
        type="button"
        className="sm:hidden p-2 rounded-md border border-black/10 dark:border-white/15 text-black dark:text-white"
        aria-label="Open menu"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen(true)}
      >
        {/* Simple hamburger icon */}
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current mb-1" />
        <span className="block w-5 h-0.5 bg-current" />
      </button>

      {open ? (
        <div className="sm:hidden fixed inset-0 z-[60] bg-white/95 dark:bg-black/95">
          <div className="flex items-center justify-between px-4 py-4">
            <Link href="/" className="hover:opacity-90 transition !no-underline" onClick={() => setOpen(false)}>
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            </Link>
            <button
              type="button"
              className="p-2 rounded-md border border-black/10 dark:border-white/15 text-black dark:text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span className="block w-5 h-0.5 rotate-45 translate-y-[3px] bg-current" />
              <span className="block w-5 h-0.5 -rotate-45 -translate-y-[3px] bg-current" />
            </button>
          </div>
          <nav className="px-4 pt-6 space-y-2">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "block w-full px-4 py-3 rounded-md text-lg",
                    "!no-underline text-black dark:text-white",
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
