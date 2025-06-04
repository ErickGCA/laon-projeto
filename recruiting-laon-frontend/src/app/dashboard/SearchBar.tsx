"use client";

import React, { useState, ChangeEvent } from 'react';
import styles from './SearchBar.module.css'; 

interface SearchBarProps {
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm); 
  };
  
  return (
    <div className={styles.searchForm}> 
      <input
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar por nome..."
        className={`form-control form-control-sm ${styles.searchInput}`}
        aria-label="Buscar filmes e séries"
      />

    </div>
  );
}
