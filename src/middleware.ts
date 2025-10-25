import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/courses", request.url));
  }
  // Nếu chưa có token và đang vào trang cần auth
  if (!token && request.nextUrl.pathname.startsWith("/courses")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  return NextResponse.next();
}

// Định nghĩa những path cần check
export const config = {
  matcher: ["/", "/courses/:path*", "/auth/:path*"],
};
