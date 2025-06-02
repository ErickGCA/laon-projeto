// src/lib/auth.config.ts
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
            //console.log("Authorize: User from Laravel:", responseData.user); // DEBUG
            return {
              id: responseData.user.id.toString(),
              isAdmin: responseData.user.is_admin,  
              name: responseData.user.nome,
              email: responseData.user.email,
              accessToken: responseData.access_token,
            };
          } else {
            console.error("Authorize: Falha no login do Laravel:", responseData.message);
            return null;
          }
        } catch (error) {
          console.error("Authorize: Erro na função:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken && session.user) {
        session.accessToken = token.accessToken;
      }
      if (typeof token.isAdmin === 'boolean' && session.user) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;