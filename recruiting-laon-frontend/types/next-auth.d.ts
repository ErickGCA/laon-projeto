// types/next-auth.d.ts
import type { Session as NextAuthSession, User as NextAuthUser } from 'next-auth';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';

// Estendemos o tipo User que o NextAuth usa internamente,
// especialmente o que é retornado pela função `authorize` do CredentialsProvider
// e o que é passado para o callback `jwt` no primeiro login.
interface ExtendedUser extends NextAuthUser {
  accessToken?: string;
  // O `id` do NextAuthUser geralmente é string, o nosso do Laravel é number.
  // O `authorize` já retorna o `id` como string, então aqui está ok.
  // Se precisar de outros campos do usuário do Laravel no token/sessão, adicione aqui.
}

declare module 'next-auth' {
  /**
   * Retornado por `useSession`, `getSession`, `auth()` e recebido como prop no `SessionProvider`.
   */
  interface Session extends NextAuthSession {
    accessToken?: string; // Nosso token de acesso do Laravel
    user: {
      id?: string | null; // ID do usuário do Laravel (já convertido para string)
    } & NextAuthSession['user']; // Mantém as propriedades padrão do user (name, email, image)
  }

  // Estendemos o tipo User globalmente para o módulo 'next-auth'
  // para que o `user` no callback `jwt` tenha o `accessToken`.
  interface User extends ExtendedUser {}
}

declare module 'next-auth/jwt' {
  /** Retornado pelo callback `jwt` e pela função `getToken`, quando se usa sessões JWT. */
  interface JWT extends NextAuthJWT {
    accessToken?: string; // Token de acesso do Laravel
    id?: string;          // ID do usuário do Laravel
    // O `name` e `email` já costumam ser incluídos no JWT por padrão se vierem do `user`.
  }
}