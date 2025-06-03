<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Diretor;
use App\Http\Resources\DiretorResource; // Crie este resource
use Illuminate\Http\Request;

class DiretorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // Retorna todos os diretores
        $diretores = Diretor::orderBy('nome')->get();
        return DiretorResource::collection($diretores);
    }
}