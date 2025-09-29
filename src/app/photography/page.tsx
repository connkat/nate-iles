export const metadata = {
  title: "Photography — Nate Iles",
  description: "Select photography shots and albums by Nate Iles.",
};

export default function PhotographyPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Photography</h1>
      <p className="text-black/70 dark:text-white/70 max-w-2xl">
        Curate albums or individual shots here. We can wire this to a local folder,
        a headless CMS, or an external gallery later.
      </p>
    </section>
  );
}
