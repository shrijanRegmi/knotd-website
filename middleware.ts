import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const premiumEnabled =
  process.env.NEXT_PUBLIC_PREMIUM_ENABLED !== "false";

export function middleware(request: NextRequest) {
  if (premiumEnabled) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.searchParams.set("section", "download");
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/auth/:path*", "/premium/:path*", "/payment/:path*", "/subscriptions/:path*"],
};
