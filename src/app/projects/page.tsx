export const metadata = {
  title: "Projects — Nate Iles",
  description: "Selected professional and personal projects by Nate Iles.",
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Projects
      </h1>
      <p className="text-black/70 dark:text-white/70 max-w-2xl">
        <a href="https://soundcloud.com/nathaniles/failing-onwards">
          Failing Onwards
        </a>{" "}
        is a podcast written, recorded, and produced by Nathan Iles. The show
        explores stories of failure and what we learn from them. This program
        was originally created as a final project for an Online Journalism class
        at the Southern Alberta Institute of Technology.
      </p>
      <p className="text-black/70 dark:text-white/70 max-w-2xl">
        <a href="https://heyzine.com/flip-book/4dfc20d45d.html">Why Why See</a>
        is a concept magazine featuring writing, photography, and layout design
        by Nathan Iles.
        <iframe
          allowFullScreen={true}
          allow="clipboard-write"
          className="fp-iframe"
          src="https://heyzine.com/flip-book/4dfc20d45d.html"
          style={{ border: "1px solid lightgray", width: "100%", height: 400 }}
        ></iframe>
      </p>
    </section>
  );
}
