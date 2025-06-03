
"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './TitulosRow.module.css'; 


interface Titulo {
  id: number;
  titulo_pt: string;
  tipo: 'filme' | 'serie'; 
  capa_url: string;
  
  ano?: number;
  avaliacao?: number;
}

interface TitulosRowProps {
  tituloSecao: string;
  titulos: Titulo[];
}

export default function TitulosRow({ tituloSecao, titulos }: TitulosRowProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!titulos || titulos.length === 0) {
    return <p className="text-white-50 mt-2">Nenhum {tituloSecao.toLowerCase()} para exibir no momento.</p>;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      
      
      const scrollAmount = carouselRef.current.clientWidth * 0.75; 
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  
  
  const showNavButtons = titulos.length > 3; 

  return (
    <section className={`mb-5 ${styles.titulosRowSection}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className={styles.sectionTitle}>{tituloSecao}</h3>
        {showNavButtons && (
          <div className={styles.carouselNavButtons}>
            <button 
              onClick={() => scroll('left')} 
              className={`btn btn-sm ${styles.navButton}`} 
              title="Anterior"
              aria-label="Rolar para esquerda"
            >
              &lt;
            </button>
            <button 
              onClick={() => scroll('right')} 
              className={`btn btn-sm ${styles.navButton}`} 
              title="Próximo"
              aria-label="Rolar para direita"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselRow} ref={carouselRef}>
          {titulos.map((titulo) => {
            const imageUrl = titulo.capa_url
              ? `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/storage/${titulo.capa_url}`
              : '/placeholder-poster.jpg'; 

            return (
              <Link
                href={`/titulo/${titulo.id}`}
                key={titulo.id}
                className={styles.cardContainer}
                title={titulo.titulo_pt}
              >
                <Image
                  src={imageUrl}
                  alt={`Pôster de ${titulo.titulo_pt}`}
                  width={180}
                  height={270}
                  className={styles.cardImage}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-poster.jpg'; }}
                  priority={titulos.indexOf(titulo) < 5} 
                />
                <div className={styles.infoOverlay}>
                  <h5>{titulo.titulo_pt}</h5>
                  {/* Adicione mais infos aqui se quiser, ex: ano */}
                  {/* {titulo.ano && <p className="small mb-0">{titulo.ano}</p>} */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
