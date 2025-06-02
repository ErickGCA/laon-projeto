
"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (session?.accessToken) {
      try {
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
    await signOut({ callbackUrl: "/login" }); 
  };

  if (!session) return null; 

  return <button onClick={handleLogout}>Sair</button>;
}