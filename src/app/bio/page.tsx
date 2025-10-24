import { redirect } from "next/navigation";

export const metadata = {
  title: "Bio — Nate Iles",
  description: "This page has moved.",
};

export default function BioPage() {
  // Redirect permanently to home now that bio content lives on the homepage
  redirect("/");
}
