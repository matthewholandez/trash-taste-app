import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

async function handleRevalidate(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 500 },
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("episodes", "max");
  return NextResponse.json({ revalidated: true });
}

export async function POST(request: Request) {
  return handleRevalidate(request);
}
