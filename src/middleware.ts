import { NextRequest, NextResponse } from "next/server";

export default function middleware(request:NextRequest){
   let authToken = request.cookies.get("loginToken")?.value;
   
   let loggedInUserNotAccessablePath = request.nextUrl.pathname == '/auth/login' || request.nextUrl.pathname == '/auth/signup'

   if(request.nextUrl.pathname == '/api/login' || request.nextUrl.pathname == '/api/user'){
      return;
   }

   if(loggedInUserNotAccessablePath){
      if(authToken){
        return NextResponse.redirect(new URL("/shop", request.url));
      }
   }else{
      if(!authToken){
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
   }

} 

export const config = {
  matcher: 
  [
    "/profile",
    "/api/:path*",
    "/auth/login",
    "/auth/signup",
    "/checkout",
    "/cart"
  ]
};