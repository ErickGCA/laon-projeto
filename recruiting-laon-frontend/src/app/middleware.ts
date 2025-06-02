import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await auth();



  if (pathname.startsWith('/admin')) {
    if (!session?.user) { // Se não estiver logado
      // console.log(`[Middleware] /admin: Usuário não logado. Redirecionando para /login?callbackUrl=${pathname}`);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${pathname}`, request.url));
    }
    // Se estiver logado, mas não for admin
    if (session.user.isAdmin !== true) {
      // console.log(`[Middleware] /admin: Usuário NÃO é admin (isAdmin: ${session.user.isAdmin}). Redirecionando para /dashboard.`);
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Ou uma página de acesso negado
    }
    // Se for admin, permite
    // console.log(`[Middleware] /admin: Acesso de admin permitido para ${session.user.email} (isAdmin: ${session.user.isAdmin})`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};