
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';

import LogoutButton from "@/components/LogoutButton";
import styles from "./dashboard.module.css";
import TitulosRow from "./TitulosRow"; 


interface Genero { id: number; nome: string; } 
interface Diretor { id: number; nome: string; } 

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
    redirect('/login');
  }

  
  
  
  
  

  const titulosResponse = await fetchTitulosFromLaravel(session.accessToken);

  const filmes = titulosResponse?.data?.filter((t: Titulo) => t.tipo === 'filme') || [];
  const series = titulosResponse?.data?.filter((t: Titulo) => t.tipo === 'serie') || [];

  return (
    <div className={styles.dashboardPage}>
      <main className="container-fluid py-2"> 
        {(!titulosResponse && session.accessToken) &&
            <div className="alert alert-warning" role="alert">
             Falha ao carregar os títulos do catálogo. Tente novamente mais tarde.
            </div>
        }
        {(titulosResponse && filmes.length === 0 && series.length === 0) &&
            <div className="alert alert-info" role="alert">
             Nenhum título encontrado no catálogo no momento.
            </div>
        }
        
        
        {(filmes.length > 0 || series.length > 0) &&
            <h2 className={styles.sectionPopular}>Populares</h2>
        }
        
        {filmes.length > 0 && <TitulosRow tituloSecao="Filmes" titulos={filmes} />}
        {series.length > 0 && <TitulosRow tituloSecao="Séries" titulos={series} />}
      </main>


    </div>
  );
}
