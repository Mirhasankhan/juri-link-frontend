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

  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");
  const isLawyerRoute =
    pathname === "/lawyer" || pathname.startsWith("/lawyer/");

  // 1. Logged-in users (any role) cannot access auth pages (login, register, etc.)
  if (role && isAuthRoute) {
    if (role === "Lawyer") {
      return NextResponse.redirect(new URL("/lawyer/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Unauthenticated Guests
  if (!role) {
    const protectedPaths = [
      "/lawyer",
      "/messages",
      "/book",
      "/premium",
      "/my-profile",
      "/create-post",
    ];

    if (protectedPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  // 3. Lawyer Role Protection
  if (role === "Lawyer") {
    // Normal users routes that lawyers are strictly blocked from accessing
    const normalUserRoutes = [
      "/",
      "/lawyers",
      "/book",
      "/services",
      "/about-us",
      "/posts",
      "/create-post",
      "/my-profile",
      "/premium",
      "/messages",
    ];

    // Seamlessly redirect old bookmarks or user routes to their lawyer equivalents
    if (pathname.startsWith("/my-profile/manage-earnings")) {
      return NextResponse.redirect(new URL("/lawyer/earnings", req.url));
    }
    if (pathname.startsWith("/my-profile/availability")) {
      return NextResponse.redirect(new URL("/lawyer/availability", req.url));
    }
    if (pathname.startsWith("/my-profile/manage-bookings")) {
      return NextResponse.redirect(new URL("/lawyer/orders", req.url));
    }
    if (pathname.startsWith("/my-profile/manage-profile")) {
      return NextResponse.redirect(new URL("/lawyer/settings", req.url));
    }
    if (pathname.startsWith("/premium")) {
      return NextResponse.redirect(new URL("/lawyer/premium", req.url));
    }
    if (pathname.startsWith("/messages")) {
      return NextResponse.redirect(new URL("/lawyer/messages", req.url));
    }

    // If lawyer is accessing lawyer dashboard routes, allow them
    if (isLawyerRoute) {
      return NextResponse.next();
    }

    // If lawyer tries to access ANY normal/public page, redirect to lawyer dashboard
    const isNormalRoute =
      pathname === "/" ||
      normalUserRoutes.some(
        (p) => p !== "/" && (pathname === p || pathname.startsWith(`${p}/`))
      );

    if (isNormalRoute) {
      return NextResponse.redirect(new URL("/lawyer/dashboard", req.url));
    }

    return NextResponse.next();
  }

  // 4. Normal User Role Protection
  if (role === "User") {
    // Normal users can NEVER access lawyer protected routes
    if (isLawyerRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Normal users cannot access premium plans (reserved for lawyers)
    if (pathname.startsWith("/premium")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo images, static media files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
