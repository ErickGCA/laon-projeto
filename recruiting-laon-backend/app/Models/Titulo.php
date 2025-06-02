<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Titulo extends Model
{
    use HasFactory;

    protected $fillable = [
        'tipo',
        'titulo_original',
        'titulo_pt',
        'ano',
        'duracao',
        'sinopse',
        'elenco',
        'premios',
        'trailer_url',
        'avaliacao',
        'estado_serie',
        'numero_temporadas',
        'idioma',
        'capa_url', 
    ];

    protected $casts = [
        'ano' => 'integer',
        'avaliacao' => 'decimal:1',
        'numero_temporadas' => 'integer',
    ];

    public function generos()
    {
        return $this->belongsToMany(Genero::class, 'titulo_genero');
    }

    public function diretores()
    {
        return $this->belongsToMany(Diretor::class, 'titulo_diretor');
    }
}