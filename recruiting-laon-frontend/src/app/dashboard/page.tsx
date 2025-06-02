// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth"; // Ajuste o caminho se necessário
import { redirect } from 'next/navigation';
import Image from 'next/image'; // Para otimizar imagens
import Link from 'next/link';   // Para navegação para detalhes do título
import LogoutButton from "@/components/LogoutButton"; // Ajuste o caminho se necessário
import styles from "./dashboard.module.css"; // Importa o CSS Module

interface Titulo {
  id: number;
  titulo_pt: string;
  tipo: 'filme' | 'serie';
  capa_url: string; // URL da imagem do pôster
  ano?: number;
  avaliacao?: number;
}
interface ApiResponseTitulos {
  data: Titulo[];
  // Se sua API tiver paginação ou outros meta dados, adicione aqui
}

async function fetchTitulosFromLaravel(accessToken: string): Promise<ApiResponseTitulos | null> {
  // ... (sua função fetchTitulosFromLaravel, sem alterações)
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

// Componente para renderizar uma fileira de títulos (Filmes ou Séries)
function TitulosRow({ tituloSecao, titulos }: { tituloSecao: string; titulos: Titulo[] }) {
  if (!titulos || titulos.length === 0) {
    return <p>Nenhum {tituloSecao.toLowerCase()} para exibir.</p>;
  }

  return (
    <section>
      <h3 className={styles.sectionTitle}>{tituloSecao}</h3>
      <div className={styles.carouselRow}>
        {titulos.map((titulo) => (
          // 1. Remova legacyBehavior
          // 2. Passe o className e outras props do <a> diretamente para o <Link>
          // 3. Remova a tag <a> interna
          <Link 
            href={`/titulo/${titulo.id}`} 
            key={titulo.id} 
            className={styles.cardContainer} // Passe o className para o Link
          >
            {/* O conteúdo que estava dentro do <a> agora fica dentro do <Link> */}
            <Image
              src={titulo.capa_url || '/placeholder-poster.jpg'}
              alt={`Pôster de ${titulo.titulo_pt}`}
              width={180}
              height={270}
              className={styles.cardImage}
            />
            <div className={styles.infoOverlay}>
              <h5>{titulo.titulo_pt}</h5>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}


export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user || !session?.accessToken) {
    redirect('/login');
  }

  const titulosResponse = await fetchTitulosFromLaravel(session.accessToken);

  const filmes = titulosResponse?.data?.filter(t => t.tipo === 'filme') || [];
  const series = titulosResponse?.data?.filter(t => t.tipo === 'serie') || [];

  return (
    <div className={styles.dashboardPage}>
      <header className="d-flex justify-content-between align-items-center mb-4">
        {/* Adapte com o logo da Laon e ícone de busca conforme o Figma */}
        <h1 className="h2">LAON Streaming</h1> 
        <div>
          <span>Bem-vindo, {session.user.name || session.user.email}!</span>
          <LogoutButton /> {/* Coloque o LogoutButton aqui ou em um componente de Navbar */}
        </div>
      </header>

      <main>
        {/* Poderia ter uma Hero Section aqui, se você decidir adicionar */}
        {/* <HeroSection tituloDestaque={filmes[0] || series[0]} /> */}

        <h2 className={styles.sectionTitle}>Populares</h2>
        
        <TitulosRow tituloSecao="FILMES" titulos={filmes} />
        <TitulosRow tituloSecao="SÉRIES" titulos={series} />

      </main>

      <footer className="mt-5 text-center text-muted">
        {/* Adapte com os links e logos do rodapé do Figma */}
        <p>&copy; {new Date().getFullYear()} Laon Labs Challenge. Feito por Erick.</p>
      </footer>
    </div>
  );
}