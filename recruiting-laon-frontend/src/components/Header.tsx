
"use client"; 

import { useSession, signOut } from "next-auth/react"; 
import { useRouter, usePathname } from "next/navigation";
import Link from 'next/link'; 
import styles from "./header.module.css"; 







export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession(); 

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/register';
  const shouldShowBackButton = !isLoginPage && !isRegisterPage;
  const isLoadingSession = status === "loading";

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {shouldShowBackButton ? (
          <button
            onClick={() => router.back()}
            className={`btn btn-outline-light btn-sm ${styles.backButton}`} 
          >
            &larr; Voltar
          </button>
        ) : (
          
          <div style={{ minWidth: '80px' }}></div> 
        )}
      </div>

      <div className={styles.centerSection}>
        <Link href="/" className={styles.titleLink}> 
          <h1 className={styles.title}>Laon Streaming</h1>
        </Link>
      </div>

      <div className={styles.rightSection}>
        {isLoadingSession ? (
          <div className="spinner-border spinner-border-sm text-light" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        ) : session?.user ? (
          <div className="d-flex align-items-center">
            <span className={`me-3 ${styles.welcomeMessage}`}> 
              Olá, {session.user.name || session.user.email}!
            </span>
            
            
            
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-sm btn-outline-light">Sair</button>
          </div>
        ) : (
          
          !isLoginPage && !isRegisterPage && (
            <div className="d-flex align-items-center">
              <Link href="/login" className={`btn btn-sm btn-light me-2 ${styles.authButton}`}>Entrar</Link>
              <Link href="/register" className={`btn btn-sm btn-primary ${styles.authButton}`}>Cadastrar</Link>
            </div>
          )
        )}
        {(!isLoadingSession && !session?.user && (isLoginPage || isRegisterPage)) && (
            <div style={{ minWidth: '180px' }}></div> 
        )}
      </div>
    </header>
  );
}