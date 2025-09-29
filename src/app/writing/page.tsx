export const metadata = {
  title: "Writing — Nate Iles",
  description: "Essays, notes, and posts by Nate Iles.",
};

export default function WritingPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="text-black/70 dark:text-white/70 max-w-2xl">
        Publish essays and posts here. We can add MDX support for rich content
        and tags later.
      </p>
    </section>
  );
}
