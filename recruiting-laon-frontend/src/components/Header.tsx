"use client";

import styles from "./header.module.css";
import { useRouter, usePathname } from "next/navigation"; 

export default function Header() {
  const router = useRouter();
  const pathname = usePathname(); 


  const loginPath = '/login';
  const registerPath = '/register';

  return (
<header className={styles.header}>
    {pathname !== loginPath && pathname !== registerPath ? (
        <button onClick={() => router.back()} className={styles.backButton}>
        Voltar
        </button>
    ) : (
        <div style={{ width: '100px', padding: '10px 15px' }}></div> 
    )}

    <h1 className={styles.title}>Laon Streaming</h1>

    <div style={{ flex: 1 }}></div>
</header>
  );
}