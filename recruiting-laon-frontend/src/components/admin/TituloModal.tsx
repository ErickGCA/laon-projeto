"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import styles from './TituloModal.module.css'; 
import Image from 'next/image';


interface Genero { id: number; nome: string; }
interface Diretor { id: number; nome: string; }
interface Titulo {
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

interface TituloFormData {
  titulo_pt: string;
  titulo_original?: string;
  tipo: 'filme' | 'serie';
  ano?: string; 
  sinopse?: string;
  elenco?: string;
  premios?: string;
  avaliacao?: string; 
  duracao?: string;
  trailer_url?: string;
  estado_serie?: string;
  numero_temporadas?: string; 
  idioma?: string;
  capa_imagem?: File | null; 
  capa_url_existente?: string; 
  generos: number[]; 
  diretores: number[]; 
}

interface TituloModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void; 
  tituloToEdit: Titulo | null;
  accessToken: string;
}

export default function TituloModal({ isOpen, onRequestClose, onSave, tituloToEdit, accessToken }: TituloModalProps) {
  const [formData, setFormData] = useState<TituloFormData>({
    titulo_pt: '',
    tipo: 'filme',
    generos: [],
    diretores: [],
    
  });
  const [allGeneros, setAllGeneros] = useState<Genero[]>([]);
  const [allDiretores, setAllDiretores] = useState<Diretor[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [generosRes, diretoresRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/generos`, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' } }),
          fetch(`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/diretores`, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' } })
        ]);
        if (!generosRes.ok || !diretoresRes.ok) throw new Error('Falha ao buscar dados para o formulário');
        
        const generosData = await generosRes.json();
        const diretoresData = await diretoresRes.json();
        
        setAllGeneros(generosData.data || []); // Assumindo que sua API retorna { data: [...] }
        setAllDiretores(diretoresData.data || []);
      } catch (err: any) {
        setError(`Erro ao carregar dados do formulário: ${err.message}`);
      }
    };
    if (isOpen && accessToken) {
      fetchData();
    }
  }, [isOpen, accessToken]);

  useEffect(() => {
    if (tituloToEdit) {
      setFormData({
        titulo_pt: tituloToEdit.titulo_pt || '',
        titulo_original: tituloToEdit.titulo_original || '',
        tipo: tituloToEdit.tipo || 'filme',
        ano: tituloToEdit.ano?.toString() || '',
        sinopse: tituloToEdit.sinopse || '',
        elenco: tituloToEdit.elenco || '',
        premios: tituloToEdit.premios || '',
        avaliacao: tituloToEdit.avaliacao?.toString() || '',
        duracao: tituloToEdit.duracao || '',
        trailer_url: tituloToEdit.trailer_url || '',
        estado_serie: tituloToEdit.estado_serie || '',
        numero_temporadas: tituloToEdit.numero_temporadas?.toString() || '',
        idioma: tituloToEdit.idioma || '',
        capa_imagem: null,
        capa_url_existente: tituloToEdit.capa_url || '',
        generos: tituloToEdit.generos?.map(g => g.id) || [],
        diretores: tituloToEdit.diretores?.map(d => d.id) || [],
      });
    } else {
      setFormData({
        titulo_pt: '', tipo: 'filme', generos: [], diretores: [], ano: '', avaliacao: '',
      });
    }
  }, [tituloToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, capa_imagem: e.target.files![0] }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: 'generos' | 'diretores') => {
    const values = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      setError("Não autenticado.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'capa_imagem' && value instanceof File) {
        submissionData.append(key, value);
      } else if (key === 'generos' || key === 'diretores') {
        (value as number[]).forEach(id => submissionData.append(`${key}[]`, id.toString()));
      } else if (value !== undefined && value !== null) {
        submissionData.append(key, String(value));
      }
    });


    if (tituloToEdit) {
      submissionData.append('_method', 'PUT'); 
    }

    const url = tituloToEdit
      ? `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos/${tituloToEdit.id}`
      : `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/api/titulos`;
    

    const method = 'POST'; 

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
        body: submissionData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 422 && errorData.errors) {
            const messages = Object.values(errorData.errors).flat().join('\n');
            throw new Error(messages);
        }
        throw new Error(errorData.message || `Erro ${res.status}`);
      }
      onSave(); 
    } catch (err: any) {
      setError(err.message);
      console.error("Erro ao salvar título:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onRequestClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>{tituloToEdit ? 'Editar Título' : 'Adicionar Novo Título'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          

          <div className="mb-3">
            <label htmlFor="titulo_pt" className="form-label text-white">Título (PT):</label>
            <input type="text" name="titulo_pt" id="titulo_pt" className="form-control text-white" value={formData.titulo_pt} onChange={handleChange} required />
          </div>


          <div className="mb-3">
            <label htmlFor="tipo" className="form-label text-white">Tipo:</label>
            <select name="tipo" id="tipo" className="form-select text-white" value={formData.tipo} onChange={handleChange}>
              <option value="filme">Filme</option>
              <option value="serie">Série</option>
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="capa_imagem" className="form-label text-white">Imagem da Capa:</label>
            <input type="file" name="capa_imagem" id="capa_imagem" className="form-control text-white" onChange={handleFileChange} />
            {tituloToEdit && formData.capa_url_existente && !formData.capa_imagem && (
              <p className="form-text">Capa atual: {formData.capa_url_existente} 
                <Image src={`${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/storage/${formData.capa_url_existente}`} alt="Capa atual" width="50" height="75" />
              </p>
            )}
          </div>


          <div className="mb-3">
            <label htmlFor="ano" className="form-label text-white">Ano:</label>
            <input type="number" name="ano" id="ano" className="form-control text-white" value={formData.ano? formData.ano : ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="titulo_original" className="form-label text-white">Título Original:</label>
            <input type="text" name="titulo_original" id="titulo_original" className="form-control text-white" value={formData.titulo_original} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="sinopse" className="form-label text-white">Sinopse:</label>
            <textarea name="sinopse" id="sinopse" className="form-control text-white" value={formData.sinopse} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="elenco" className="form-label text-white">Elenco:</label>
            <textarea name="elenco" id="elenco" className="form-control text-white" value={formData.elenco} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="premios" className="form-label text-white">Prêmios:</label>
            <textarea name="premios" id="premios" className="form-control text-white" value={formData.premios} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="avaliacao" className="form-label text-white">Avaliação:</label>
            <input type="number" name="avaliacao" id="avaliacao" className="form-control text-white" value={formData.avaliacao? formData.avaliacao : ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="duracao" className="form-label text-white">Duração:</label>
            <input type="number" name="duracao" id="duracao" className="form-control text-white" value={formData.duracao? formData.duracao : ''} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="trailer_url" className="form-label text-white">URL do Trailer:</label>
          </div>


          <div className="mb-3">
            <label htmlFor="generos" className="form-label text-white">Gêneros:</label>
            <select multiple name="generos" id="generos" className="form-select text-white" value={formData.generos.map(String)} onChange={(e) => handleMultiSelectChange(e, 'generos')}>
              {allGeneros.map(g => <option key={g.id} value={g.id}>{g.nome}</option>)}
            </select>
          </div>


          <div className="mb-3">
            <label htmlFor="diretores" className="form-label text-white">Diretores:</label>
            <select multiple name="diretores" id="diretores" className="form-select text-white" value={formData.diretores.map(String)} onChange={(e) => handleMultiSelectChange(e, 'diretores')}>
              {allDiretores.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
            </select>
          </div>
          

          <div className="d-flex justify-content-end">
            <button type="button" onClick={onRequestClose} className="btn btn-secondary me-2 text-black" disabled={isSubmitting}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : (tituloToEdit ? 'Atualizar Título' : 'Adicionar Título')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}