
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import styles from './Footer.module.css'; 

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container-fluid ${styles.footerContainer}`}> 
        <div className={styles.footerContent}>
          <div className={styles.footerLogoSection}>
            
            <Link href="/" className={styles.logoLink}>
                
                <span className={styles.logoText}>LAON</span>
                <span className={styles.logoTextStreaming}>STREAMING</span>
            </Link>
          </div>
          <nav className={styles.footerNav}>
            <Link href="/inicio" className={styles.footerLink}>Início</Link>
            
            <Link href="/login" className={styles.footerLink}>Entrar ou Cadastrar</Link>
            <Link href="/termos" className={styles.footerLink}>Termos e Condições</Link>
            <Link href="/privacidade" className={styles.footerLink}>Política de Privacidade</Link>
            <Link href="/ajuda" className={styles.footerLink}>Ajuda</Link>
          </nav>
          <div className={styles.footerSocial}>
            
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
              
            </a>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <p>&copy; {new Date().getFullYear()} Laon Labs. Todos os direitos reservados. Feito por Erick.</p>
        </div>
      </div>
    </footer>
  );
}
