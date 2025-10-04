import fs from "fs";
import path from "path";
import Image from "next/image";
import imageSize from "image-size";

export const metadata = {
  title: "Photography — Nate Iles",
  description: "Select photography shots and albums by Nate Iles.",
};

type PhotoMeta = { src: string; width: number; height: number };

function getPhotoMeta(): PhotoMeta[] {
  const photosDir = path.join(process.cwd(), "public", "photos");
  const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

  const results: PhotoMeta[] = [];

  function walk(dir: string, baseUrl: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      const url = path.posix.join(baseUrl, entry.name);
      if (entry.isDirectory()) {
        walk(abs, url);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (allowed.has(ext)) {
          const fileBuf = fs.readFileSync(abs);
          const dim = imageSize(fileBuf);
          if (dim.width && dim.height) {
            results.push({ src: url, width: dim.width, height: dim.height });
          }
        }
      }
    }
  }

  walk(photosDir, "/photos");
  return results;
}

export default function PhotographyPage() {
  const photos = getPhotoMeta();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Photography
        </h1>
      </header>

      {photos.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">
          No photos found in <code>public/photos</code>.
        </p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {photos.map(({ src, width, height }) => (
            <figure
              key={src}
              className="mb-4 break-inside-avoid rounded overflow-hidden"
            >
              <Image
                src={src}
                alt=""
                width={width}
                height={height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full h-auto object-cover transition hover:opacity-90"
              />
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
