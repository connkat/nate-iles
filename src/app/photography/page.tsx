import Image from "next/image";
import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const metadata = {
  title: "Photography — Nate Iles",
  description: "Select photography shots and albums by Nate Iles.",
};

type PhotographyImage = {
  image: SanityImageSource;
  width?: number;
  height?: number;
  description?: string;
};
type PhotographyDoc = {
  _id: string;
  title?: string;
  description?: string;
  image?: SanityImageSource;
  width?: number;
  height?: number;
};

export default async function PhotographyPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "photography"]|order(_createdAt desc){
      _id,
      title,
      description,
      image,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }`,
  });
  const docs = data as PhotographyDoc[];
  const images: PhotographyImage[] = docs
    .filter((d) => d.image)
    .map((d) => ({
      image: d.image as SanityImageSource,
      width: d.width,
      height: d.height,
      description: d.description ?? "",
    }));

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Photography
        </h1>
      </header>

      {images.length === 0 ? (
        <p className="text-black/60 dark:text-white/60">
          No photos found. Add some in the Studio at /studio.
        </p>
      ) : (
        <div className="columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((img, idx) => {
            const isHero = idx % 8 === 0; // tweak cadence to taste
            const baseW = img.width ?? 1200;
            const baseH = img.height ?? 800;
            const width = isHero ? Math.max(1800, baseW) : baseW;
            const height = isHero ? Math.round(baseH * (width / baseW)) : baseH;

            return (
              <figure
                key={idx}
                className="group relative mb-4 break-inside-avoid rounded overflow-hidden"
                style={undefined}
              >
                <Image
                  src={urlFor(img.image).width(width).fit("max").url()}
                  alt="photography sample"
                  width={width}
                  height={height}
                  sizes={"50vw"}
                  className="w-full h-auto object-cover transition duration-200 group-hover:opacity-90"
                />
                {img.description ? (
                  <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-end">
                    <p className="p-3 text-sm text-white/95">
                      {img.description}
                    </p>
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      )}
    </section>
  );
}
