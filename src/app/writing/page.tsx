import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata = {
  title: "Writing — Nathan Iles",
  description: "Essays, notes, and posts by Nathan Iles.",
};

type Writing = {
  _id: string;
  title: string;
  slug?: { current: string } | null;
  url?: string | null;
  publishedAt: string;
  excerpt?: string | null;
  categoryTitle?: string | null;
  image?: SanityImageSource | null;
};

async function getData(category?: string): Promise<Writing[]> {
  const base = `*[_type == "writing"${category ? " && category->title == $category" : ""}]|order(publishedAt desc){
    _id,
    title,
    slug,
    url,
    publishedAt,
    excerpt,
    "categoryTitle": category->title,
    image
  }`;
  const { data }: { data: Writing[] | undefined } = await sanityFetch({
    query: base,
    params: category ? { category } : {},
  });
  return data ?? [];
}

async function getCategories(): Promise<string[]> {
  const { data: cats }: { data: string[] | undefined } = await sanityFetch({
    query: `*[_type == "writingCategory"]|order(title asc).title`,
  });
  return cats ?? [];
}

export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const selectedCategoryParam = sp?.category;
  const selectedCategory = Array.isArray(selectedCategoryParam)
    ? selectedCategoryParam[0]
    : selectedCategoryParam;
  const categories = await getCategories();
  let sections: { category: string; items: Writing[] }[] = [];
  if (selectedCategory) {
    const items = await getData(selectedCategory);
    sections = [{ category: selectedCategory, items }];
  } else {
    const itemsByCategory = await Promise.all(
      categories.map((cat) => getData(cat))
    );
    sections = categories.map((cat, i) => ({ category: cat, items: itemsByCategory[i] }));
  }
  sections = sections.filter(({ items }) => items.length > 0);
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Writing
      </h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        basePath="/writing"
      />
      {sections.map(({ category, items }) => (
        <div key={category} className="space-y-3">
          <h2 className="text-xl font-medium tracking-tight">{category}</h2>
          <div className="-mx-4 overflow-x-auto">
            <div className="px-4 flex gap-4 snap-x snap-mandatory">
              {items.map((item) => {
                const href = item.url ?? "#";
                return (
                  <article
                    key={item._id}
                    className="flex-none w-56 sm:w-80 snap-start"
                  >
                    {item.image ? (
                      <div className="relative h-[75vh] sm:h-56 w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
                        <Image
                          src={urlFor(item.image)
                            .width(900)
                            .height(600)
                            .fit("crop")
                            .url()}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 224px, 320px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <a href={href} className="absolute inset-0 p-4 flex flex-col justify-end gap-1 focus:outline-none">
                          <h3
                            className="text-white text-lg font-semibold leading-tight"
                            style={{ textShadow: "0 0 2px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9), 0 -1px 2px rgba(0,0,0,0.9), 1px 0 2px rgba(0,0,0,0.9), -1px 0 2px rgba(0,0,0,0.9)" }}
                          >
                            {item.title}
                          </h3>
                          {item.excerpt ? (
                            <p
                              className="text-white/95 text-sm line-clamp-3"
                              style={{ textShadow: "0 0 2px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9), 0 -1px 2px rgba(0,0,0,0.9), 1px 0 2px rgba(0,0,0,0.9), -1px 0 2px rgba(0,0,0,0.9)" }}
                            >
                              {item.excerpt}
                            </p>
                          ) : null}
                        </a>
                      </div>
                    ) : (
                      <a href={href} className="relative h-[75vh] sm:h-56 w-full overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 flex flex-col justify-end">
                        <h3
                          className="text-white text-lg font-semibold leading-tight"
                          style={{ textShadow: "0 0 2px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9), 0 -1px 2px rgba(0,0,0,0.9), 1px 0 2px rgba(0,0,0,0.9), -1px 0 2px rgba(0,0,0,0.9)" }}
                        >
                          {item.title}
                        </h3>
                        {item.excerpt ? (
                          <p
                            className="text-white/95 text-sm line-clamp-3"
                            style={{ textShadow: "0 0 2px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.9), 0 -1px 2px rgba(0,0,0,0.9), 1px 0 2px rgba(0,0,0,0.9), -1px 0 2px rgba(0,0,0,0.9)" }}
                          >
                            {item.excerpt}
                          </p>
                        ) : null}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
