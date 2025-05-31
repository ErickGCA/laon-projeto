<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diretor extends Model
{
    use HasFactory;
    protected $table = 'diretores'; // por algum motivo a tabela diretores não estava sendo lida

    protected $fillable = ['nome'];

    public function titulos()
    {
        return $this->belongsToMany(Titulo::class, 'titulo_diretor');
    }
}