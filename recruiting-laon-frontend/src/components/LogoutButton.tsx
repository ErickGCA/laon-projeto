// src/components/LogoutButton.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session?.accessToken) {
      try {
        // Invalida o token no backend Laravel
        await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
            'Accept': 'application/json',
          },
        });
      } catch (error) {
        console.error("Erro ao fazer logout no backend Laravel:", error);
      }
    }
    // Faz o logout no NextAuth.js (limpa a sessão do frontend)
    await signOut({ callbackUrl: "/login" }); // Redireciona para login após sair
  };

  if (!session) return null; // Não mostra o botão se não estiver logado

  return <button onClick={handleLogout}>Sair</button>;
}