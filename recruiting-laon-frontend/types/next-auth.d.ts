// types/next-auth.d.ts
import type { Session as NextAuthSession, User as NextAuthUser } from 'next-auth';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';


interface ExtendedUser extends NextAuthUser {
  accessToken?: string;
  isAdmin?: boolean;

}

declare module 'next-auth' {
  interface User extends NextAuthUser { 
    accessToken?: string;
    isAdmin?: boolean;
  }

  interface Session extends NextAuthSession {
    accessToken?: string;
    // Se quiser isAdmin diretamente na sessão:
    // isAdmin?: boolean; 
    user: {
      id?: string | null;
      isAdmin?: boolean; 
    } & NextAuthSession['user']; 
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    accessToken?: string;
    id?: string;
    isAdmin?: boolean;
  }
}