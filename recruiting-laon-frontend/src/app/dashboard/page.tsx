import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';
import styles from "./dashboard.module.css";
import CatalogoFiltrado from './CatalogoFiltrado'; 

interface Titulo {
  id: number;
  titulo_pt: string;
  tipo: 'filme' | 'serie';
  capa_url: string;
  ano?: number;
  avaliacao?: number;
}
interface ApiResponseTitulos {
  data: Titulo[];
}

async function fetchTitulosFromLaravel(accessToken: string): Promise<ApiResponseTitulos | null> {
  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error("Dashboard: Falha ao buscar títulos do Laravel", res.status, await res.text().catch(()=>""));
      return { data: [] }; 
    }
    return res.json();
  } catch (error) {
    console.error("Dashboard: Erro de rede ao buscar títulos:", error);
    return { data: [] }; 
  }
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user || !session?.accessToken) {
    redirect('/login');
  }

  const titulosResponse = await fetchTitulosFromLaravel(session.accessToken);
  

  const todosOsTitulos = titulosResponse?.data || [];
  const filmes = todosOsTitulos.filter((t: Titulo) => t.tipo === 'filme');
  const series = todosOsTitulos.filter((t: Titulo) => t.tipo === 'serie');

  return (
    <div className={styles.dashboardPage}>
      <main className="container-fluid py-4">
        <CatalogoFiltrado initialFilmes={filmes} initialSeries={series} />
      </main>
    </div>
  );
}
