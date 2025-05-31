// auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Importa sua configuração

export const {
  handlers: { GET, POST }, // Handlers para a rota da API
  auth,                   // Para usar em server components/actions e middleware
  signIn,                 // Função para iniciar o login
  signOut,                // Função para fazer logout
} = NextAuth({
  ...authConfig, // Usa sua configuração de provedores, páginas e callbacks
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
});