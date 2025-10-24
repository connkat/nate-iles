export const metadata = {
  title: "Contact — Nate Iles",
  description: "Get in touch.",
};

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Contact
      </h1>
      <p className="text-black/70 dark:text-white/70">
        Have a project or question? Send me a message below.
      </p>

      {/* Simple, no-backend email form via formsubmit.co. Replace action with a custom endpoint later if needed. */}
      <form
        action="https://formsubmit.co/nathan.iles1@gmail.com"
        method="POST"
        data-captcha="true"
        className="space-y-4 max-w-xl"
      >
        {/* FormSubmit config */}
        <input
          type="hidden"
          name="_subject"
          value="New message from nate-iles.com"
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="true" />
        {/* Optional: Redirect after submit */}
        {/* <input type="hidden" name="_next" value="https://your-site.com/thanks" /> */}

        {/* Honeypot for bots */}
        <input
          type="text"
          name="_honey"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-sm text-black/70 dark:text-white/70"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm text-black/70 dark:text-white/70"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="message"
            className="text-sm text-black/70 dark:text-white/70"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          Send
        </button>
      </form>
    </section>
  );
}
