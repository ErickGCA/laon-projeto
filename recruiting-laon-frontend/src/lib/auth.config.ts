
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password, 
            }),
          });

          const responseData = await res.json();

          if (res.ok && responseData.access_token && responseData.user) {
            return {
              id: responseData.user.id.toString(), 
              name: responseData.user.nome,
              email: responseData.user.email,
              accessToken: responseData.access_token,
            };
          } else {
            console.error("Falha no login do Laravel:", responseData.message || "Credenciais inválidas");
            return null; 
          }
        } catch (error) {
          console.error("Erro na função authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', 
    // error: '/auth-error', 
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if ('accessToken' in user && typeof user.accessToken === 'string') {
          token.accessToken = user.accessToken;
        }
        if (user.id && typeof user.id === 'string') {
          token.id = user.id;
        }
        if (user.name) {
            token.name = user.name;
        }
        if (user.email) {
            token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken && session.user) { 
        session.accessToken = token.accessToken as string;
      }
      if (token.id && session.user) { 
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // session: { strategy: "jwt" }, 
  // secret: process.env.AUTH_SECRET, 
} satisfies NextAuthConfig;