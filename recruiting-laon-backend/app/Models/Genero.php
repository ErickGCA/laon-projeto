<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    use HasFactory;

    protected $fillable = ['nome'];

    public function titulos()
    {
        return $this->belongsToMany(Titulo::class, 'titulo_genero');
    }
}