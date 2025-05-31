// src/app/register/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        // Opcional: Logar automaticamente após o registro
        const loginResult = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password, // A senha original, não o hash
        });
        if (loginResult?.ok) {
          router.push('/dashboard'); // Ou para onde quiser
        } else {
          // Se o login automático falhar, redireciona para a página de login manual
          router.push('/login');
        }
      } else {
        setError(responseData.message || "Falha no registro. Verifique os dados.");
        if (responseData.errors) {
          // Tratar múltiplos erros de validação do Laravel
          const errorMessages = Object.values(responseData.errors).flat().join(' ');
          setError(errorMessages);
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao tentar registrar.");
    }
  };

  return (
    <div>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div>
          <label htmlFor="nome">Nome:</label>
          <input id="nome" name="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirmar Senha:</label>
          <input id="passwordConfirmation" name="passwordConfirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}