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
      <button 
  onClick={() => router.back()} 
  style={{ backgroundColor: '#1F1D2F', color: '#fff', border: '1px solid #000', padding: '0.5rem 1rem', borderRadius: '4px' }}
>
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