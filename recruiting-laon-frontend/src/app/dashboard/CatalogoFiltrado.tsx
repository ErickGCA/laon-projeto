"use client";

import React, { useState, useEffect, useMemo } from 'react';
import styles from "./dashboard.module.css"; 
import TitulosRow from './TitulosRow'; 
import SearchBar from './SearchBar';   


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

interface CatalogoFiltradoProps {
  initialFilmes: Titulo[];
  initialSeries: Titulo[];
}

export default function CatalogoFiltrado({ initialFilmes, initialSeries }: CatalogoFiltradoProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filmesFiltrados = useMemo(() => {
    if (!searchTerm) return initialFilmes;
    return initialFilmes.filter(filme =>
      filme.titulo_pt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialFilmes, searchTerm]);

  const seriesFiltradas = useMemo(() => {
    if (!searchTerm) return initialSeries;
    return initialSeries.filter(serie =>
      serie.titulo_pt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialSeries, searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const semResultadosFilmes = searchTerm && filmesFiltrados.length === 0 && initialFilmes.length > 0;
  const semResultadosSeries = searchTerm && seriesFiltradas.length === 0 && initialSeries.length > 0;

  return (
    <>
      <div className={`d-flex justify-content-between align-items-center ${styles.sectionHeader}`}>
        <h2 className={styles.sectionPopular}>Populares</h2>
        <div className={styles.searchContainer}>
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
      </div>
      
      {initialFilmes.length > 0 && (
        <TitulosRow tituloSecao="Filmes" titulos={filmesFiltrados} />
      )}
      {semResultadosFilmes && <p className="text-white-50 ms-3">Nenhum filme encontrado para "{searchTerm}".</p>}


      {initialSeries.length > 0 && (
         <TitulosRow tituloSecao="Séries" titulos={seriesFiltradas} />
      )}
      {semResultadosSeries && <p className="text-white-50 ms-3">Nenhuma série encontrada para "{searchTerm}".</p>}

      {initialFilmes.length === 0 && initialSeries.length === 0 && (
         <div className="alert alert-info mt-3" role="alert">
           Nenhum título encontrado no catálogo no momento.
         </div>
      )}
    </>
  );
}
