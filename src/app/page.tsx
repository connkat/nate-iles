"use client";

import Link from "next/link";
// Image import removed; using canvas-based ScrambleImage instead
import ScrambleImage from "../components/ScrambleImage";
import { useScrollProgress } from "../hooks/useScramble";

export default function Home() {
  const imgProgress = useScrollProgress(0, 400);
  // Show full-size image (no zoom). Keep a subtle fade-in if desired.
  const scale = 1;
  const opacity = 0.2 + 0.8 * imgProgress; // 0.2 -> 1

  return (
    <section className="space-y-10">
      {/* Callout sits above the two-column grid so the image aligns with the next content */}
      <div className="rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-32 p-4">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Hi! I’m Nate, a communications specialist based in
          Mohkinstsis/Calgary. I like punk rock, old movies, Vertigo comics, and
          (most of all) writing … lots and lots of writing!
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-start">
        <div className="space-y-4 sm:col-span-3">
          <p className="text-black/70 dark:text-white/70">
            As the editor of The Scene magazine — a publication of RedPoint
            Media — I assign, edit, write, and produce an entire magazine every
            single month that delves deep into arts and culture in Calgary. It’s
            kind of a dream job! I’m also the artist biography coordinator for
            the Sled Island Music & Arts Festival, where I write and edit over
            200 artist biographies every single year. And hey, I love
            freelancing as well (hint, hint). I have bylines in fine
            publications like CBC Arts, Create Calgary, SAIT Communications, The
            Escapist and Avenue Calgary, and have had the joy of copywriting for
            companies such as POD Marketing and ATB Financial .
          </p>
          <p className="text-black/70 dark:text-white/70">
            Feature articles, website content, inter-office memos, song lyrics,
            play scripts, artist biographies, press releases, podcast outlines,
            brochure materials ... You name it, and I&apos;ve written it! And
            I’m not half-bad at video/audio production or photography, either.
          </p>
          <p className="text-black/70 dark:text-white/70">
            But it all had to start somewhere, right? I’ll admit it: I’m a
            recovering theatre kid and current musician who has spent over a
            decade working in Calgary&apos;s arts and non-profit sector with
            companies such as Alberta Theatre Projects, Scorpio Theatre, and
            Swallow-a-Bicycle Theatre. As such, I’m a rockstar public speaker,
            director, board member, and administrative professional … And I can
            do a pretty killer Southern accent as well!
          </p>
          <p className="text-black/70 dark:text-white/70">
            Curiosity lies at the heart of all my work. I’m insatiable about my
            craft, and this excitement (I call it “stoke-i-tude”) guides my
            research, interviews, and interpersonal processes. I like talking to
            people. I like exploring the world. And I love writing all about it.
          </p>
          <p className="text-black/70 dark:text-white/70">
            Whether 200 characters or 200 pages, your communication needs an
            authentic voice; I&apos;ll help you find it!
          </p>
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
