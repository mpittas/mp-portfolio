import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (!MOBILE_UA.test(ua)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/v/list", request.url));
}

export const config = {
  matcher: "/",
};
