import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("loginToken")?.value;
  const { pathname } = request.nextUrl;

  // Paths that should not be accessed by logged-in users
  const loggedInUserNotAccessablePath =
    pathname === "/auth/login" || pathname === "/auth/signup";

  // Bypass login for certain API routes
  if (pathname === "/api/login" || pathname === "/api/user") {
    return NextResponse.next();
  }

  // Cart page requires authentication
  if (pathname === "/cart") {
    if (!authToken) {
      console.log("middleware execute 2");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    console.log("middleware execute 3");
    return NextResponse.next();
  }

  // If the user is logged in but trying to access login/signup, redirect them to /shop
  if (loggedInUserNotAccessablePath && authToken) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  // Allow logged-out users to access login and signup pages
  if (!authToken && loggedInUserNotAccessablePath) {
    return NextResponse.next();
  }

  // Handle access control for other paths
  if (!authToken) {
    if (pathname.startsWith("/api")) {
      // For API routes, return an access denied response
      return NextResponse.json(
        { message: "Access Denied !!", success: false },
        { status: 401 }
      );
    } else {
      // For other non-API routes, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // If there's an authToken, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/api/:path*",
    "/auth/login",
    "/auth/signup",
    "/checkout",
    "/cart",
  ],
};
