import { sanityFetch } from "../../sanity/lib/live";
import { urlFor } from "../../sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const metadata = {
  title: "Projects — Nate Iles",
  description: "Selected professional and personal projects by Nate Iles.",
};

type Project = {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
  url?: string;
  image?: SanityImageSource;
};

export default async function ProjectsPage() {
  const { data } = await sanityFetch({
    query: `*[_type == "project"]|order(_createdAt desc){
      _id, title, slug, description, url, image
    }`,
  });
  const projects = data as Project[];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Projects
      </h1>

      {projects.length === 0 ? (
        <div className="space-y-4 text-black/70 dark:text-white/70">
          <p>No projects found yet. Add some in the Studio at /studio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p: Project) => (
            <article
              key={p._id}
              className="rounded-lg border border-black/10 dark:border-white/10 p-5 space-y-3"
            >
              <header className="space-y-1">
                <h2 className="font-semibold text-lg">{p.title}</h2>
                {p.description && (
                  <p className="text-sm text-black/70 dark:text-white/70">
                    {p.description}
                  </p>
                )}
              </header>
              {p.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(p.image)
                      .width(800)
                      .height(450)
                      .fit("crop")
                      .url()}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-3 text-sm">
                {p.url && (
                  <a
                    className="underline"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Project Link ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
