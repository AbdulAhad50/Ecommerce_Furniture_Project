import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const authToken = request.cookies.get("loginToken")?.value;
  const authAdminToken = request.cookies.get("adminToken")?.value;
  
  console.log('Middleware Execute');

  const { pathname } = request.nextUrl;
  
  const loggedInAdminNotAccessablePath = pathname === "/admin/auth/signin";
  const loggedInUserNotAccessablePath = pathname === "/auth/login" || pathname === "/auth/signup";

  if (pathname === "/api/login" || pathname === "/api/user") {
    return NextResponse.next();
  }

  if (pathname === "/api/product" || pathname === "/api/addProduct" || pathname === '/api/order' ) {
    return NextResponse.next();
  }

  if (!authAdminToken && loggedInAdminNotAccessablePath) {
    return NextResponse.next();
  }

  if (loggedInAdminNotAccessablePath && authAdminToken) {
    console.log('Admin Already Logged In');
    return NextResponse.redirect(new URL("/admin/dash", request.url));
  }

  if (authAdminToken && pathname === "/admin/auth/signin") {
    return NextResponse.redirect(new URL("/admin/dash", request.url));
  }

  if (pathname === "/admin/dash" || pathname === "/admin/products" || pathname === '/admin/customers' || pathname === '/admin/order') {
    if (!authAdminToken) {
      console.log("Redirecting to Admin Signin");
      return NextResponse.redirect(new URL("/admin/auth/signin", request.url));
    }
  }

  if (pathname === "/cart") {
    if (!authToken) {
      console.log("Redirecting to User Login from Cart");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    else{
    return
  }
  }

  
  if (loggedInUserNotAccessablePath && authToken) {
    return NextResponse.redirect(new URL("/shop", request.url));
  }

  
  if (!authToken && loggedInUserNotAccessablePath) {
    return NextResponse.next();
  }
  
  if (!authToken) {
    if (pathname.startsWith("/api")) {
      
      return NextResponse.json(
        { message: "Access Denied !!", success: false },
        { status: 401 }
      );
    } else {
      
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  
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
    "/admin/:path*",
    "/admin/auth/signin",
    "/admin/dash"
  ],
};
