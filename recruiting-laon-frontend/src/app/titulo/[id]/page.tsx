import { auth } from "@/lib/auth"; 
import { redirect, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './titulo-detalhes.module.css'; 

interface Genero { id: number; nome: string; }
interface Diretor { id: number; nome: string; }
interface TituloDetalhes {
  id: number;
  titulo_pt: string;
  titulo_original?: string;
  ano?: number;
  duracao?: string;
  sinopse?: string;
  elenco?: string;
  premios?: string;
  avaliacao?: number;
  capa_url: string;
  tipo: 'filme' | 'serie';
  generos?: Genero[];
  diretores?: Diretor[];
  trailer_url?: string;
}
interface ApiSingleTituloResponse { data: TituloDetalhes; }


async function fetchTituloDetalhes(id: string, accessToken: string): Promise<TituloDetalhes | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });
    if (res.status === 404) return notFound(); 
    if (!res.ok) {
      console.error(`Detalhes Título: Falha ao buscar título ID ${id}`, res.status);
      throw new Error("Falha ao carregar dados do título."); 
    }
    const responseData: ApiSingleTituloResponse = await res.json();
    return responseData.data;
  } catch (error) {
    console.error(`Detalhes Título: Erro de rede ao buscar título ID ${id}:`, error);
    if (error instanceof Error && error.message.includes("Falha ao carregar dados do título.")) {
        throw error; 
    }
    notFound(); 
    return null; 
  }
}


export default async function TituloDetalhesPage({ params }: { params: { id: string } }) {
  const session = await auth();

  if (!session?.user || !session.accessToken) {
    redirect('/login'); 
  }

  const titulo = await fetchTituloDetalhes(params.id, session.accessToken);

  if (!titulo) {
    notFound(); 
  }

  return (
    <div className={styles.paginaDetalhes}>
      <header className={`${styles.headerDetalhes} d-flex justify-content-between align-items-center`}>

      </header>

      <main className={styles.conteudoPrincipal}>
        <div className={styles.posterArea}>
          <Image
            src={titulo.capa_url ? `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/storage/${titulo.capa_url}` : '/placeholder-poster.jpg'}
            alt={`Pôster de ${titulo.titulo_pt}`}
            width={300} 
            height={450} 
            className={styles.posterImagem}
            priority 
          />
          {titulo.trailer_url && (
            <a 
              href={titulo.trailer_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn btn-light ${styles.botaoTrailer}`}
            >
              Assistir trailer
            </a>
          )}
        </div>

        <div className={styles.infoArea}>
          <h1>{titulo.titulo_pt}</h1>
          {titulo.titulo_original && titulo.titulo_original !== titulo.titulo_pt && (
            <p className={styles.subInfo}>Título original: {titulo.titulo_original}</p>
          )}
          <p className={styles.subInfo}>
            {titulo.ano && <span>{titulo.ano}</span>}
            {titulo.duracao && <span> &bull; {titulo.duracao}</span>}
          </p>
          
          {titulo.generos && titulo.generos.length > 0 && (
            <div className={styles.tagsContainer}>
              {titulo.generos.map(genero => (
                <span key={genero.id} className={`badge bg-secondary me-1 ${styles.tagGenero}`}>{genero.nome}</span>
              ))}
            </div>
          )}

          {titulo.sinopse && (
            <section className={styles.sectionDetalhes}>
              <h3>Sinopse</h3>
              <p>{titulo.sinopse}</p>
            </section>
          )}

          {titulo.elenco && (
            <section className={styles.sectionDetalhes}>
              <h3>Elenco</h3>
              <p>{titulo.elenco}</p>
            </section>
          )}
          
          {titulo.diretores && titulo.diretores.length > 0 && (
             <section className={styles.sectionDetalhes}>
               <h3>Diretor</h3>
               <p>{titulo.diretores.map(d => d.nome).join(', ')}</p>
             </section>
          )}

          {titulo.premios && (
            <section className={styles.sectionDetalhes}>
              <h3>Prêmios</h3>
              <p>{titulo.premios}</p>
            </section>
          )}

          {titulo.avaliacao && (
            <section className={styles.sectionDetalhes}>
              <h3>Avaliações</h3>
              <p>IMDb: {titulo.avaliacao}/10</p>
            </section>
          )}
        </div>
      </main>


    </div>
  );
}