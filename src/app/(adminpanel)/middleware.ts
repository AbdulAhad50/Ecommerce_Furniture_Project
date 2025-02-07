import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authAdminToken = request.cookies.get("adminToken")?.value;
  const { pathname } = request.nextUrl;

  console.log("middleware execute 2");

  // Paths that should not be accessed by logged-in users
  const loggedInAdminNotAccessablePath = pathname === "/admin/auth/signin";

  // // Bypass login for certain API routes
  // if (pathname === "/api/login" || pathname === "/api/user") {
  //   return NextResponse.next();
  // }

  // if (pathname === "/api/product" || pathname === "/api/addProduct" || pathname === '/api/order') {
  //   return;
  // }

  // if (pathname === "/api/user"){
  //   return;
  // }

  // Cart page requires authentication
  // if (pathname === "/cart") {
  //   if (!authToken) {
  //     console.log("middleware execute 2");
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  //   console.log("middleware execute 3");
  //   return NextResponse.next();
  // }

  if (loggedInAdminNotAccessablePath && authAdminToken) {
    return NextResponse.redirect(new URL("/admin/dash", request.url));
  }

  if (authAdminToken && pathname === "/admin/auth/signin") {
    return NextResponse.redirect(new URL("/admin/dash", request.url));
  }


  if (!authAdminToken && loggedInAdminNotAccessablePath) {
    return NextResponse.next();
  }

  if (!authAdminToken) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { message: "Access Denied !!", success: false },
        { status: 401 }
      );
    } else {
      return NextResponse.redirect(new URL("/admin/auth/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    '/admin/auth/signin'
  ],
};
