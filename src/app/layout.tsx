import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nate Iles — Portfolio",
  description: "Portfolio and resume site for Nate Iles: bio, photography, projects, and writing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        <header className="border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Nate Iles
            </Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/bio" className="hover:opacity-80">Bio</Link>
              <Link href="/photography" className="hover:opacity-80">Photography</Link>
              <Link href="/projects" className="hover:opacity-80">Projects</Link>
              <Link href="/writing" className="hover:opacity-80">Writing</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">
          {children}
        </main>
        <footer className="mt-12 border-t border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-6 text-xs text-black/60 dark:text-white/60">
            © {new Date().getFullYear()} Nate Iles. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
