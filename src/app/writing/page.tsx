import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";

export const metadata = {
  title: "Writing — Nate Iles",
  description: "Essays, notes, and posts by Nate Iles.",
};

type Writing = {
  _id: string;
  title: string;
  slug?: { current: string } | null;
  url?: string | null;
  publishedAt: string;
  excerpt?: string | null;
  category?: string | null;
  image?: SanityImageSource | null;
};

async function getData(category?: string): Promise<Writing[]> {
  const base = `*[_type == "writing"${category ? " && category == $category" : ""}]|order(publishedAt desc){
    _id,
    title,
    slug,
    url,
    publishedAt,
    excerpt,
    category,
    image
  }`;
  return client.fetch<Writing[]>(base, category ? { category } : {});
}

async function getCategories(): Promise<string[]> {
  const cats = await client.fetch<string[]>(
    `*[_type == "writing" && defined(category)].category`
  );
  // de-duplicate and stable sort
  return Array.from(new Set(cats)).sort();
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
  const [data, categories] = await Promise.all([
    getData(selectedCategory),
    getCategories(),
  ]);
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Writing</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        basePath="/writing"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {data.map((item) => {
          const href = item.url ?? "#";
          return (
            <article key={item._id} className="flex gap-4">
              {item.image ? (
                <div className="relative h-24 w-24 flex-none overflow-hidden rounded-md border border-black/10 dark:border-white/10">
                  <Image
                    src={urlFor(item.image).width(200).height(200).fit("crop").url()}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="space-y-1">
                <h2 className="text-lg font-medium">
                  <a href={href} className="hover:underline">
                    {item.title}
                  </a>
                </h2>
                {item.excerpt ? (
                  <p className="text-sm text-black/70 dark:text-white/70 max-w-prose">
                    {item.excerpt}
                  </p>
                ) : null}
                <div className="text-xs text-black/60 dark:text-white/60">
                  <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  {item.category ? (
                    <>
                      <span> • </span>
                      <Link
                        href={`/writing?category=${encodeURIComponent(item.category)}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {item.category}
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

 
