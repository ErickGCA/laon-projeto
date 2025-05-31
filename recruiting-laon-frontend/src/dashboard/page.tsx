// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth"; // Ajuste o caminho se @ não for src, ou use relativo
import { redirect } from 'next/navigation';
import LogoutButton from "@/components/LogoutButton"; // Assumindo que você tem este componente

// Interface para os dados que você espera da sua API de títulos
interface Titulo {
  id: number;
  titulo_pt: string;
  // outras propriedades...
}
interface ApiResponseTitulos {
  data: Titulo[];
  // outras propriedades da paginação...
}

async function fetchTitulosFromLaravel(accessToken: string): Promise<ApiResponseTitulos | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      cache: 'no-store', // Para dados dinâmicos
    });
    if (!res.ok) {
      console.error("Dashboard: Falha ao buscar títulos do Laravel", res.status);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Dashboard: Erro de rede ao buscar títulos:", error);
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user || !session?.accessToken) {
    redirect('/login'); // Se não estiver logado, vai para o login
  }

  const titulosResponse = await fetchTitulosFromLaravel(session.accessToken);

  return (
    <div>
      <h1>Dashboard Principal</h1>
      <p>Bem-vindo, {session.user.name || session.user.email}!</p>
      <LogoutButton />

      <h2>Catálogo de Títulos (Server Component)</h2>
      {titulosResponse && titulosResponse.data && titulosResponse.data.length > 0 ? (
        <ul>
          {titulosResponse.data.map((titulo) => (
            <li key={titulo.id}>{titulo.titulo_pt}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum título para exibir ou falha ao carregar.</p>
      )}
    </div>
  );
}