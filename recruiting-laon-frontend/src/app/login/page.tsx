"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, FormEvent } from "react";
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Email ou senha inválidos." : result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
      } else {
        setError("Ocorreu um erro desconhecido durante o login.");
      }
    } catch (err: any) {
      setError(err.message || "Falha ao tentar logar.");
    }
  };

  return (
    <div className={`${styles.loginPageWrapper} d-flex align-items-center py-4`}> 
      <main className="form-signin w-100 m-auto" style={{ maxWidth: '400px' }}> 
        <div className={`card shadow-sm ${styles.loginCard}`}> 
          <div className="card-body p-4 p-md-5"> 
          <h1 className={`${styles.titulo} h3 mb-3 fw-normal text-center`}>Entrar</h1>
          <p className={`${styles.subtitulo} text-center`}>Bem-vindo de volta!</p>
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div className={`alert alert-danger ${styles.errorMessage}`} role="alert">
                  {error}
                </div>
              )}
              
              <div className={`${styles.emailinput} form-floating mb-3`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@exemplo.com"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              
              <div className={`${styles.senhainput} form-floating mb-3`}> 
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha" 
                  required
                />
                <label htmlFor="password">Senha</label> 
              </div>
              
              <button className={`w-100 btn btn-lg btn-primary ${styles.customButton}`} type="submit"> 
                Entrar
              </button>
            </form>
            <p className={`${styles.titulo} mt-3 text-center`}>
              Não tem uma conta? <a href="/register" className={`${styles.customRegister}`}>   Registre-se</a>
            </p>
            <p className={`mt-5 mb-3 text-body-secondary text-center ${styles.titulo}`}>
              <span className={`${styles.copyright}`}>&copy;  Laon Labs Challenge </span>
              </p> 
          </div>
        </div>
      </main>
    </div>
  );
}
