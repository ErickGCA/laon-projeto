import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; 
import { CgWebsite } from "react-icons/cg";

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
            <Link href="/login" className={styles.footerLink}>Início</Link>
            <Link href="/termos" className={styles.footerLink}>Termos e Condições</Link>
            <Link href="/privacidade" className={styles.footerLink}>Política de Privacidade</Link>
            <Link href="/ajuda" className={styles.footerLink}>Ajuda</Link>
          </nav>
          <div className={styles.footerSocial}>
            <a href="https://www.facebook.com/laonlabs/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/laonlabs/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://laonlabs.com/pt" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Website">
              <CgWebsite />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
