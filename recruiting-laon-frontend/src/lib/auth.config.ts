// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({
      // Não precisamos da UI padrão do NextAuth para credentials aqui,
      // pois vamos criar nosso próprio formulário de login.
      // A função authorize é a chave.
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
              password: credentials.password, // Laravel Auth::attempt espera 'password'
            }),
          });

          const responseData = await res.json();

          if (res.ok && responseData.access_token && responseData.user) {
            return {
              id: responseData.user.id.toString(), // ID precisa ser string para NextAuth
              name: responseData.user.nome,
              email: responseData.user.email,
              accessToken: responseData.access_token,
              // Adicione quaisquer outros campos do usuário do Laravel
            };
          } else {
            console.error("Falha no login do Laravel:", responseData.message || "Credenciais inválidas");
            return null; // Falha na autenticação
          }
        } catch (error) {
          console.error("Erro na função authorize:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login', // Redireciona para sua página de login customizada
    // error: '/auth-error', // (Opcional) Página de erro de autenticação
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persiste o accessToken e o ID do usuário no JWT após o login
      if (account && user) {
        // Verificamos se 'accessToken' existe em user e se tem um valor
        // user aqui é o objeto retornado pela sua função authorize
        if ('accessToken' in user && typeof user.accessToken === 'string') {
          token.accessToken = user.accessToken;
        }
        // O id deve existir se o user veio do authorize
        if (user.id && typeof user.id === 'string') {
          token.id = user.id;
        }
        // O name e email geralmente são tratados pelo NextAuth se existirem no objeto user
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
      // Envia propriedades do JWT para a sessão do cliente
      if (token.accessToken && session.user) { // Adicionada verificação para session.user
        session.accessToken = token.accessToken as string;
      }
      if (token.id && session.user) { // Adicionada verificação para session.user
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // session: { strategy: "jwt" }, // Padrão com App Router
  // secret: process.env.AUTH_SECRET, // Já definido nas opções do NextAuth em auth.ts
} satisfies NextAuthConfig;