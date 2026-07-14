import { NextRequest, NextResponse } from "next/server";
import { normalizeSource } from "@/lib/source";
import { subscribeToKit } from "@/lib/kit";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeRequestBody {
  email?: unknown;
  source?: unknown;
}

export async function POST(request: NextRequest) {
  let body: SubscribeRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const rawSource = typeof body.source === "string" ? body.source : undefined;

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const source = normalizeSource(rawSource);
  const result = await subscribeToKit({ email, source });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "subscribe_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, source });
}
