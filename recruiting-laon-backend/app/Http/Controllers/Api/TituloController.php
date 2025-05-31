<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Titulo;
use Illuminate\Http\Request;
use App\Http\Resources\TituloResource;
use App\Http\Resources\TituloCollection; 
use Illuminate\Support\Facades\Validator;

class TituloController extends Controller
{
    public function index()
    {
        // paginação Titulo::paginate();
        // carregar relacionamentos: Titulo::with(['generos', 'diretores'])->get();
        // analisar posteriromente
        return new TituloCollection(Titulo::with(['generos', 'diretores'])->paginate(10));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'required|string|max:255',
            'tipo' => 'required|in:filme,serie',
            'ano' => 'nullable|integer|digits:4',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id', 
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id', 
            'capa_url' => 'nullable|url|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $titulo = Titulo::create($request->only([
            'titulo_pt', 'titulo_original', 'tipo', 'ano', 'sinopse', 'elenco',
            'premios', 'avaliacao', 'estado_serie', 'numero_temporadas', 'idioma', 'capa_url'
        ]));

        if ($request->has('generos')) {
            $titulo->generos()->sync($request->generos);
        }
        if ($request->has('diretores')) {
            $titulo->diretores()->sync($request->diretores);
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function show(Titulo $titulo)
    {
        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function update(Request $request, Titulo $titulo)
    {
        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'sometimes|required|string|max:255',
            'tipo' => 'sometimes|required|in:filme,serie',
            'ano' => 'nullable|integer|digits:4',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id',
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id',
            'capa_url' => 'nullable|url|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $titulo->update($request->only([
            'titulo_pt', 'titulo_original', 'tipo', 'ano', 'sinopse', 'elenco',
            'premios', 'avaliacao', 'estado_serie', 'numero_temporadas', 'idioma', 'capa_url'
        ]));

        if ($request->has('generos')) {
            $titulo->generos()->sync($request->generos);
        }
        if ($request->has('diretores')) {
            $titulo->diretores()->sync($request->diretores);
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function destroy(Titulo $titulo)
    {
        $titulo->delete();
        return response()->json(null, 204);
    }
}