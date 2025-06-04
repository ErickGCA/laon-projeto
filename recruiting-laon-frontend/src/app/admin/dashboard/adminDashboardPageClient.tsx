"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import styles from "./dashboard.module.css"; 
import TituloModal from '@/components/admin/TituloModal'; 


interface Genero {
  id: number;
  nome: string;
}
interface Diretor {
  id: number;
  nome: string;
}
export interface Titulo { 
  id: number;
  titulo_pt: string;
  tipo: 'filme' | 'serie';
  capa_url: string; 
  ano?: number;
  avaliacao?: number;
  sinopse?: string;
  elenco?: string;
  premios?: string;
  duracao?: string;
  trailer_url?: string;
  estado_serie?: string;
  numero_temporadas?: number;
  idioma?: string;
  titulo_original?: string;
  generos?: Genero[];
  diretores?: Diretor[];
  
}
interface ApiResponseTitulos {
  data: Titulo[];
  meta?: { 
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
}


function AdminTituloTableRow({ titulo, onEdit, onDelete }: {
  titulo: Titulo;
  onEdit: (titulo: Titulo) => void;
  onDelete: (id: number, tituloNome: string) => void;
}) {
  const imageUrl = titulo.capa_url
    ? `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/storage/${titulo.capa_url}`
    : '/placeholder-poster.jpg'; 

  return (
    <tr>
      <td>
        <Image
          src={imageUrl}
          alt={`Capa de ${titulo.titulo_pt}`}
          width={50}
          height={75}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-poster.jpg'; }} 
        />
      </td>
      <td>{titulo.titulo_pt}</td>
      <td>{titulo.tipo === 'filme' ? 'Filme' : 'Série'}</td>
      <td>{titulo.ano || 'N/A'}</td>
      <td>
        <button 
          onClick={() => onEdit(titulo)} 
          className="btn btn-sm btn-outline-warning me-2" 
          title="Editar Título"
        >
          Editar
        </button>
        <button 
          onClick={() => onDelete(titulo.id, titulo.titulo_pt)} 
          className="btn btn-sm btn-outline-danger" 
          title="Deletar Título"
        >
          Deletar
        </button>
      </td>
    </tr>
  );
}


export default function AdminDashboardPageClient() {
  const { data: session, status } = useSession();
  const [titulos, setTitulos] = useState<Titulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsFrom, setItemsFrom] = useState(0);
  const [itemsTo, setItemsTo] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTitulo, setEditingTitulo] = useState<Titulo | null>(null);

  const performFetch = async (pageToFetch: number) => {
    if (!session?.accessToken) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos?page=${pageToFetch}`, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Erro desconhecido ao buscar títulos.' }));
        if (res.status === 429) {
          setError("Muitas requisições. Por favor, aguarde um momento.");
        } else {
          setError(errorData.message || `Falha ao buscar títulos: ${res.status}`);
        }
        setTitulos([]); 
        return; 
      }

      const responseData: ApiResponseTitulos = await res.json();
      setTitulos(responseData.data || []);
      if (responseData.meta) {
        setTotalPages(responseData.meta.last_page);
        setTotalItems(responseData.meta.total);
        setItemsFrom(responseData.meta.from || 0);
        setItemsTo(responseData.meta.to || 0);
      }
    } catch (err: any) {
      if (!error || error !== "Muitas requisições. Por favor, aguarde um momento.") {
        setError(err.message);
      }
      setTitulos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      performFetch(currentPage);
    } else if (status === "unauthenticated") {
      setLoading(false);
      setTitulos([]);
    } else if (status === "loading") {
      setLoading(true);
    }
  }, [status, session?.accessToken, currentPage]);

  const handleOpenModalForNew = () => {
    setEditingTitulo(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (titulo: Titulo) => {
    setEditingTitulo(titulo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTitulo(null);
  };

  const handleSaveSuccess = () => { 
    performFetch(editingTitulo ? currentPage : 1);
    handleCloseModal();
  };

  const handleDeleteTitulo = async (id: number, tituloNome: string) => {
    if (!session?.accessToken) {
      alert("Sessão inválida ou token não encontrado.");
      return;
    }
    if (confirm(`Tem certeza que deseja deletar o título "${tituloNome}"? Esta ação não pode ser desfeita.`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session.accessToken}`,
            'Accept': 'application/json',
          },
        });
        if (res.status === 204) {
          alert("Título deletado com sucesso!");
          performFetch(currentPage);
        } else {
          const errorData = await res.json().catch(() => ({ message: 'Falha ao deletar o título.' }));
          throw new Error(errorData.message || `Erro ${res.status}`);
        }
      } catch (err: any) {
        alert(`Erro ao deletar: ${err.message}`);
        console.error("Erro ao deletar título:", err);
      }
    }
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (status === "loading" && loading) { 
    return <div className="container mt-5 text-center"><p>Carregando dados do administrador...</p></div>;
}

return (
    <div className={styles.adminDashboardContent}>
          <header
            className="d-flex justify-content-between align-items-center py-3 px-4 mb-4 text-white"
            style={{ backgroundColor: '#1F1D2F' }}
            >
            <h1 className="h3 mb-0">Gerenciamento de Catálogo</h1>
            <button onClick={handleOpenModalForNew} className="btn btn-lg" style={{ backgroundColor: '#1F1D2F', color: '#fff', border: '1px solid #000', borderRadius: '10px' }}>

                <i className="fas fa-plus me-2"></i>Adicionar Novo Título
            </button>
        </header>

        <main className="px-4">
            {loading && !error && <div className="text-center my-5"><div className="spinner-border text-light" role="status"><span className="visually-hidden">Carregando...</span></div></div>}
            {error && <div className="alert alert-danger">Erro ao carregar títulos: {error}</div>}
            
            {!loading && !error && titulos.length > 0 && (
            <>

                <div className="table-responsive">
                <table className={`table table-striped table-hover table-dark ${styles.adminTable}`}>
                    <thead>
                    <tr>
                        <th>Capa</th>
                        <th>Título (PT)</th>
                        <th>Tipo</th>
                        <th>Ano</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {titulos.map((titulo) => (
                        <AdminTituloTableRow 
                        key={titulo.id} 
                        titulo={titulo} 
                        onEdit={handleOpenModalForEdit} 
                        onDelete={handleDeleteTitulo}
                        />
                    ))}
                    </tbody>
                </table>
                </div>
                {totalPages > 1 && (
                <nav aria-label="Paginação de títulos" className="mt-4">
                    <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Anterior</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Próxima &raquo;</button>
                    </li>
                    </ul>
                </nav>
                )}
            </>
            )}
            {!loading && !error && titulos.length === 0 && (
            <div className="alert alert-info text-center">Nenhum título cadastrado no momento. Clique em "Adicionar Novo Título" para começar.</div>
            )}
        </main>

        {isModalOpen && session?.accessToken && (
            <TituloModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            onSave={handleSaveSuccess}
            tituloToEdit={editingTitulo}
            accessToken={session.accessToken}
            />
        )}
    </div>
);
}