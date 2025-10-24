"use client";

import { useState } from "react";
import Link from "next/link";

export default function CategoryFilter({
  categories,
  selectedCategory,
  basePath = "/writing",
}: {
  categories: string[];
  selectedCategory?: string;
  basePath?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={[
          "px-3 py-1 text-sm rounded-full border transition-colors",
          "border-black/10 text-black hover:text-black hover:bg-black/5",
          "dark:border-white/15 dark:text-white dark:hover:text-white dark:hover:bg-white/5",
        ].join(" ")}
      >
        filter
      </button>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      <FilterChip
        label="All"
        href={basePath}
        active={!selectedCategory}
        onClick={() => setOpen(false)}
      />
      {categories.map((cat) => (
        <FilterChip
          key={cat}
          label={cat}
          href={`${basePath}?category=${encodeURIComponent(cat)}`}
          active={selectedCategory === cat}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={[
        "px-3 py-1 text-sm rounded-full border transition-colors",
        active
          ? [
              "bg-white !text-black border-black hover:!text-black",
              "dark:bg-white dark:!text-black dark:border-white dark:hover:!text-black",
            ].join(" ")
          : [
              "border-black/10 text-black/70 hover:text-black hover:bg-black/5",
              "dark:border-white/15 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5",
            ].join(" "),
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
