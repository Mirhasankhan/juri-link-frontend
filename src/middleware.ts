import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface ExtendedJwtPayload {
  role?: "User" | "Lawyer";
}

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

  let role: ExtendedJwtPayload["role"] | null = null;

  if (tokenCookie?.value) {
    try {
      const decoded = jwtDecode<ExtendedJwtPayload>(tokenCookie.value);
      role = decoded.role ?? null;
    } catch {
      role = null;
    }
  }

  const loginUrl = new URL("/auth/login", req.url);
  const is = (path: string) => pathname.startsWith(path);

  // 1. Unauthenticated Guests
  if (!role) {
    const protectedPaths = [
      "/messages",
      "/book",
      "/premium",
      "/my-profile",
      "/create-post",
    ];
    if (protectedPaths.some((p) => is(p))) {
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Lawyer Role Guards
  if (role === "Lawyer") {
    const lawyerBlocked = ["/book", "/create-post"];
    if (lawyerBlocked.some((p) => is(p))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 3. User Role Guards
  if (role === "User") {
    const userBlocked = ["/premium"];
    if (userBlocked.some((p) => is(p))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/messages/:path*",
    "/book/:path*",
    "/premium/:path*",
    "/my-profile/:path*",
    "/create-post/:path*",
  ],
};
