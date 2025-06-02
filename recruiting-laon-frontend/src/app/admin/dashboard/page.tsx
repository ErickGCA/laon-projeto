import { auth } from "@/lib/auth";  
import { redirect } from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link';     
import LogoutButton from "@/components/LogoutButton"; 
import styles from "./dashboard.module.css"; 

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
      console.error("Dashboard: Falha ao buscar títulos do Laravel", res.status);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Dashboard: Erro de rede ao buscar títulos:", error);
    return null;
  }
}

function TitulosRow({ tituloSecao, titulos }: { tituloSecao: string; titulos: Titulo[] }) {
  if (!titulos || titulos.length === 0) {
    return <p className="text-white-50">Nenhum {tituloSecao.toLowerCase()} para exibir no momento.</p>; 
  }

  return (
    <section className="mb-5"> 
      <h3 className={styles.sectionTitle}>{tituloSecao}</h3>
      <div className={styles.carouselRow}>
        {titulos.map((titulo) => {
          const imageUrl = titulo.capa_url 
                           ? `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/storage/${titulo.capa_url}` 
                           : '/placeholder-poster.jpg'; 

          return (
            <Link 
              href={`/titulo/${titulo.id}`} 
              key={titulo.id} 
              className={styles.cardContainer}
            >
              <Image
                src={imageUrl} 
                alt={`Pôster de ${titulo.titulo_pt}`}
                width={180} 
                height={270} 
                className={styles.cardImage}
              />
              <div className={styles.infoOverlay}>
                <h5>{titulo.titulo_pt}</h5>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user || !session?.accessToken) {
    redirect('/login');
  }
  if (!session.user.isAdmin) {
    redirect('/dashboard');
  }

  const titulosResponse = await fetchTitulosFromLaravel(session.accessToken);

  const filmes = titulosResponse?.data?.filter(t => t.tipo === 'filme') || [];
  const series = titulosResponse?.data?.filter(t => t.tipo === 'serie') || [];

  return (
    <div className={styles.dashboardPage}>
      {/*
        <header className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom"> 
        <Image src="/laon-logo.png" alt="Laon Logo" width={100} height={40} /> 
        <h1 className="h4 mb-0"> Catálogo Laon</h1> 
        <div className="d-flex align-items-center">
          <span className="me-3">Bem-vindo, {session.user.name || session.user.email}!</span>
          <LogoutButton />
        </div>
      </header>
      
      */}

      <main className="container-fluid py-4"> 
        {/* hero section */}

        {(!titulosResponse || (filmes.length === 0 && series.length === 0)) && 
         (titulosResponse !== null) && /* Evita mostrar se ainda está carregando/deu erro total no fetch */
            <div className="alert alert-info" role="alert">
             Nenhum título popular encontrado no momento.
            </div>
        }
        
        {/* Só renderiza a seção "Populares" e as fileiras se houver títulos */}
        {(filmes.length > 0 || series.length > 0) && 
            <h2 className= {styles.sectionPopular}>ADMIN PAGE</h2>
        }
        
        {filmes.length > 0 && <TitulosRow tituloSecao="Filmes" titulos={filmes} />}
        {series.length > 0 && <TitulosRow tituloSecao="Séries" titulos={series} />}

      </main>

      <footer className="mt-auto py-3 text-center bg-dark text-white-50"> 
        <p className="mb-0">&copy; {new Date().getFullYear()} Laon Labs Challenge. Feito por Erick.</p>
      </footer>
    </div>
  );
}