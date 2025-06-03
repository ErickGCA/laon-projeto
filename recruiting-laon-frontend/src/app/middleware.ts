import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();



  if (pathname.startsWith('/admin')) {
    if (!session?.user) { 
      
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
    }
    
    if (session.user.isAdmin !== true) {
      
      return NextResponse.redirect(new URL("/dashboard", request.url)); 
    }
    
    
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};