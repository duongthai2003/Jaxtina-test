import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  // Nếu chưa có token và đang vào trang cần auth
  if (!token && request.nextUrl.pathname.startsWith("/courses")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Định nghĩa những path cần check
export const config = {
  matcher: ["/courses/:path*"],
};
