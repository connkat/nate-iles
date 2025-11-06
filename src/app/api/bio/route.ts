import { NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

const BIO_QUERY = `*[_type == "bio"][0]{ title, tagline, content }`;

export async function GET() {
  try {
    const data = await client.fetch(BIO_QUERY);
    return NextResponse.json({ bio: data ?? null });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bio" }, { status: 500 });
  }
}
