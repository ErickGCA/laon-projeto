<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TituloResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tipo' => $this->tipo,
            'titulo_original' => $this->titulo_original,
            'titulo_pt' => $this->titulo_pt,
            'ano' => $this->ano,
            'duracao' => $this->duracao,
            'sinopse' => $this->sinopse,
            'elenco' => $this->elenco, 
            'premios' => $this->premios,
            'trailer_url' => $this->trailer_url,
            'avaliacao' => (float) $this->avaliacao,
            'estado_serie' => $this->when($this->tipo === 'serie', $this->estado_serie),
            'numero_temporadas' => $this->when($this->tipo === 'serie', $this->numero_temporadas),
            'idioma' => $this->idioma,
            'capa_url' => $this->capa_url,
            'generos' => GeneroResource::collection($this->whenLoaded('generos')),
            'diretores' => DiretorResource::collection($this->whenLoaded('diretores')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}