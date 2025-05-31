// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"; // Para onde redirecionar após login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false, // Importante para tratar o resultado manualmente
        email,
        password,
        // callbackUrl // NextAuth cuidará do redirecionamento se redirect:true ou se não especificado
      });

      if (result?.error) {
        setError(result.error === "CredentialsSignin" ? "Email ou senha inválidos." : result.error);
      } else if (result?.ok) {
        router.push(callbackUrl); // Redireciona após login bem-sucedido
      } else {
        setError("Ocorreu um erro desconhecido durante o login.");
      }
    } catch (err: any) {
      setError(err.message || "Falha ao tentar logar.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      {/* (Opcional) Link para Registro */}
      <p>Não tem uma conta? <a href="/register">Registre-se</a></p>
    </div>
  );
}