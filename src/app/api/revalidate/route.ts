import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Optional: keep this on the edge/runtime if desired
export const runtime = "nodejs";

function json<T>(data: T, init?: number | ResponseInit) {
  const status = typeof init === "number" ? init : init?.status;
  const responseInit: ResponseInit = typeof init === "number" ? {} : (init ?? {});
  return NextResponse.json(data, { ...responseInit, status: status ?? 200 });
}

async function handle(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return json({ message: "Invalid secret" }, 401);
  }

  // Allow manual testing: /api/revalidate?secret=...&path=/projects
  const manualPath = url.searchParams.get("path");
  const revalidated: string[] = [];

  if (manualPath) {
    revalidatePath(manualPath);
    revalidated.push(manualPath);
    return json({ revalidated, manual: true });
  }

  // Sanity webhook payloads are JSON. Example fields that may appear:
  //  - body: { _type: string, ... }
  //  - _type directly on root depending on webhook config

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payload: any = null;
  try {
    if (req.method !== "GET") {
      payload = await req.json();
    }
  } catch {
    // ignore bad JSON; proceed with conservative revalidation
  }

  const docType: string | undefined =
    payload?.body?._type ?? payload?._type ?? payload?.document?._type;

  // Revalidate paths based on the changed document type
  if (!docType) {
    // If we can't detect, revalidate the important paths conservatively
    revalidatePath("/projects");
    revalidatePath("/photography");
    revalidated.push("/projects", "/photography");
  } else {
    if (docType === "project") {
      revalidatePath("/projects");
      revalidated.push("/projects");
    }
    if (docType === "photography") {
      revalidatePath("/photography");
      revalidated.push("/photography");
    }
    if (docType === "writing") {
      revalidatePath("/writing");
      revalidated.push("/writing");
    }
  }

  return json({ revalidated, docType: docType ?? null });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handle(req);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return handle(req);
}
