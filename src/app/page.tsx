"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import ScrambleImage from "../components/ScrambleImage";
import { useScrollProgress } from "../hooks/useScramble";

export default function Home() {
  const imgProgress = useScrollProgress(0, 400);
  const [bio, setBio] = useState<{
    title?: string;
    tagline?: string;
    content?: PortableTextBlock[];
  } | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/bio", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (active) setBio(data?.bio ?? null);
      } catch {}
    })();
    return () => {
      active = false;
    };
  }, []);
  const scale = 1;
  const opacity = 0.2 + 0.8 * imgProgress; // 0.2 -> 1

  return (
    <section className="space-y-10">
      <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-32 p-4">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          {bio?.tagline || (
            <>
              Hi! I’m Nate, a communications specialist based in
              {' '}Mohkinstsis/Calgary. I like punk rock, old movies, Vertigo comics, and
              {' '}(most of all) writing … lots and lots of writing!
            </>
          )}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-start">
        <div className="space-y-4 sm:col-span-3">
          {bio?.content ? (
            <div className="prose dark:prose-invert max-w-none">
              <PortableText
                value={bio.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="!mb-6">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="flex items-start justify-end sm:col-span-2 self-start">
          <div className="w-full max-w-[520px] md:max-w-[560px] lg:max-w-[600px]">
            <ScrambleImage
              src="/headshots/001-transparent.png"
              width={720}
              height={720}
              progress={imgProgress}
              cropTop={0}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top right",
                opacity: opacity,
                transition: "transform 120ms linear, opacity 120ms linear",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/writing"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium relative inline-block after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-current after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
            Writing →
          </h2>
        </Link>
        <Link
          href="/photography"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium relative inline-block after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-current after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
            Photography →
          </h2>
        </Link>
        <Link
          href="/projects"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium relative inline-block after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-current after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
            Projects →
          </h2>
        </Link>
        <Link
          href="/contact"
          className="group rounded-lg border border-black/10 dark:border-white/10 p-5 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <h2 className="font-medium relative inline-block after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-current after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
            Contact →
          </h2>
        </Link>
      </div>
    </section>
  );
}
