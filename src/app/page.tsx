"use client";

import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-10 min-h-[200vh]">
      <div className="space-y-4">
        <p className="text-black/70 dark:text-white/70 max-w-2xl">
          Hi! I’m Nate, a communications specialist based in
          Mohkinstsis/Calgary. I like punk rock, old movies, Vertigo comics, and
          (most of all) writing … lots and lots of writing!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/bio"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium">Bio →</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Background and resume.
          </p>
        </Link>
        <Link
          href="/photography"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium">Photography →</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Select shots and albums.
          </p>
        </Link>
        <Link
          href="/projects"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium">Projects →</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Professional and personal work.
          </p>
        </Link>
        <Link
          href="/writing"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium">Writing →</h2>
          <p className="text-sm text-black/60 dark:text-white/60">
            Essays, notes, and posts.
          </p>
        </Link>
      </div>
    </section>
  );
}
