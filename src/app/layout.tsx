import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans", // reuse existing CSS var mapping for sans
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nathan Iles — Portfolio",
  description: "Portfolio and resume site for Nathan Iles: bio, photography, projects, and writing.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}>
        <header className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Header />
        </header>
        <main className="px-2 sm:px-3 md:px-4 lg:px-6 py-10">
          {children}
        </main>
        <footer className="mt-12 border-t border-black/10 dark:border-white/10">
          <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-6 text-xs text-black/60 dark:text-white/60 flex items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Nathan Iles. All rights reserved.</div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-2"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="M3 7l9 6 9-6"></path>
                </svg>
                <span className="sr-only">Email</span>
              </Link>
              <a
                href="https://www.instagram.com/thisfeelsbetter"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-2"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z"/>
                  <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/nathaniles/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-2"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.329-.027-3.039-1.852-3.039-1.853 0-2.136 1.447-2.136 2.943v5.665H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.605 0 4.27 2.373 4.27 5.459v6.284zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.897 20.452H3.776V9h3.121v11.452z"/>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.muckrack.com/nathan-iles-1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition flex items-center gap-2"
                aria-label="Muck Rack"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M7 16V8l5 6 5-6v8"></path>
                </svg>
                <span className="sr-only">Muck Rack</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
