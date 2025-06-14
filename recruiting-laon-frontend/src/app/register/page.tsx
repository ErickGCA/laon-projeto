"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import styles from './register.module.css'; 
import stylesLogin from '../login/login.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha: password,
          senha_confirmation: passwordConfirmation,
        }),
      });

      const responseData = await res.json();

      if (res.ok && responseData.access_token) {
        setSuccess("Registro bem-sucedido! Você será redirecionado para o login ou pode logar automaticamente.");
        const loginResult = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password, 
        });
        if (loginResult?.ok) {
          router.push('/dashboard'); 
        } else {
          router.push('/login');
        }
      } else {
        setError(responseData.message || "Falha no registro. Verifique os dados.");
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).flat().join(' ');
          setError(errorMessages);
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao tentar registrar.");
    }
  };

  return (
    <div className={`${stylesLogin.loginPageWrapper} d-flex align-items-center py-4`}>
      <main className="form-signin w-100 m-auto" style={{ maxWidth: '400px' }}> 
        <div className={`card shadow-sm ${stylesLogin.loginCard}`}>
          <div className="card-body p-4 p-md-5"> 
            <h1 className={`${stylesLogin.titulo} h3 mb-3 fw-normal text-center`}>Cadastre-se</h1> 
            <p className={`${stylesLogin.subtitulo} text-center`}>Acompanhe os melhores filmes e séries</p>
            <form onSubmit={handleSubmit}>
              {error && (
                <div className={`alert alert-danger ${styles.errorMessage}`} role="alert"> 
                  {error}
                </div>
              )}
              <div className={`${stylesLogin.emailinput} form-floating mb-3`}>  
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  className="form-control" 
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome Completo" 
                  required
                />
                <label htmlFor="nome">Nome Completo</label> 
              </div>

              <div className={`${stylesLogin.emailinput} form-floating mb-3`}> 
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
              
              <div className={`${stylesLogin.senhainput} form-floating mb-3`} style={{ position: "relative" }}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  required
                />
                <label htmlFor="password">Senha</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9-3-11-7 1.09-2.02 2.87-3.73 5.17-4.7" />
                      <path d="M1 1l22 22" />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className={`${stylesLogin.senhainput} form-floating mb-3`} style={{ position: "relative" }}>
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  className="form-control"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Confirme sua senha"
                  required
                />
                <label htmlFor="passwordConfirmation">Confirme sua senha</label>
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label="Toggle password confirmation visibility"
                >
                  {showPasswordConfirmation ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9-3-11-7 1.09-2.02 2.87-3.73 5.17-4.7" />
                      <path d="M1 1l22 22" />
                      <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" />
                    </svg>
                  )}
                </button>
              </div>

              {success && (
                <div className={`alert alert-success ${styles.successMessage}`} role="alert"> 
                  {success}
                </div>
              )}

              <button className={`w-100 btn btn-lg btn-primary ${stylesLogin.customButton}`} type="submit">
                Registrar
              </button>
            </form>

            <p className={`${stylesLogin.titulo} mt-3 text-center`}>
              Já tem a sua conta? <a href="/login" className={`${stylesLogin.customRegister}`}>Faça o login</a>
            </p>

            <p className={`mt-5 mb-3 text-body-secondary text-center ${stylesLogin.titulo}`}>
              <span className={`${stylesLogin.copyright}`}>&copy; Laon Labs Challenge</span>
            </p> 
          </div>
        </div>
      </main>
    </div>
  );
}
