<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Titulo;
use Illuminate\Http\Request;
use App\Http\Resources\TituloResource;
use App\Http\Resources\TituloCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage; // Para lidar com arquivos

class TituloController extends Controller
{
    public function index()
    {
        return new TituloCollection(Titulo::with(['generos', 'diretores'])->paginate(10));
    }

    public function store(Request $request)
    {
        if (!Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'required|string|max:255',
            'tipo' => 'required|in:filme,serie',
            'ano' => 'nullable|integer|digits:4',
            'sinopse' => 'nullable|string',
            'elenco' => 'nullable|string',
            'premios' => 'nullable|string',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'duracao' => 'nullable|string|max:100',
            'trailer_url' => 'nullable|url|max:500',
            'estado_serie' => 'nullable|in:finalizada,cancelada,em andamento,piloto',
            'numero_temporadas' => 'nullable|integer|min:1',
            'idioma' => 'nullable|string|max:50',
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id',
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id',
            // Validação para o upload da imagem da capa
            'capa_imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // 'capa_imagem' é o nome do campo do arquivo
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->except(['capa_imagem', 'generos', 'diretores']);

        if ($request->hasFile('capa_imagem')) {
            // Salva a imagem em storage/app/public/posters e obtém o caminho
            $path = $request->file('capa_imagem')->store('posters', 'public');
            $data['capa_url'] = $path; // Salva o caminho relativo (ex: posters/arquivo.jpg)
        }

        $titulo = Titulo::create($data);

        if ($request->filled('generos')) {
            $titulo->generos()->sync($request->input('generos', []));
        }
        if ($request->filled('diretores')) {
            $titulo->diretores()->sync($request->input('diretores', []));
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function show(Titulo $titulo)
    {
        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function update(Request $request, Titulo $titulo)
    {
        if (!Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado.'], 403);
        }

        // Nota: O Laravel não lida bem com arquivos (PUT/PATCH) via x-www-form-urlencoded por padrão.
        // Para uploads em updates, o frontend geralmente envia um POST com um campo _method='PUT'.
        // Ou você pode criar um endpoint dedicado como /api/titulos/{id}/update-com-capa
        // Para simplificar aqui, vamos assumir que a capa_url pode ser uma string (caminho existente)
        // ou um novo upload (capa_imagem).

        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'sometimes|required|string|max:255',
            'tipo' => 'sometimes|required|in:filme,serie',
            // ... outras validações como no store ...
            'ano' => 'nullable|integer|digits:4',
            'sinopse' => 'nullable|string',
            'elenco' => 'nullable|string',
            'premios' => 'nullable|string',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'duracao' => 'nullable|string|max:100',
            'trailer_url' => 'nullable|url|max:500',
            'estado_serie' => 'nullable|in:finalizada,cancelada,em andamento,piloto',
            'numero_temporadas' => 'nullable|integer|min:1',
            'idioma' => 'nullable|string|max:50',
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id',
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id',
            'capa_imagem' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Para nova imagem
            'capa_url' => 'nullable|string|max:255', // Para manter/definir caminho existente
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->except(['capa_imagem', '_method', 'generos', 'diretores']); // _method se estiver usando POST para simular PUT

        if ($request->hasFile('capa_imagem')) {
            // Deletar a imagem antiga se existir e uma nova for enviada
            if ($titulo->capa_url) {
                Storage::disk('public')->delete($titulo->capa_url);
            }
            $path = $request->file('capa_imagem')->store('posters', 'public');
            $data['capa_url'] = $path;
        } elseif ($request->filled('capa_url')) {
            // Se capa_imagem não foi enviada, mas capa_url sim (para manter ou mudar para um path existente)
            $data['capa_url'] = $request->input('capa_url');
        }
        // Se nem capa_imagem nem capa_url forem enviados, capa_url existente no $titulo é mantido.

        $titulo->update($data);

        if ($request->has('generos')) { // Usar has() para permitir array vazio para desvincular
            $titulo->generos()->sync($request->input('generos', []));
        }
        if ($request->has('diretores')) {
            $titulo->diretores()->sync($request->input('diretores', []));
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    public function destroy(Titulo $titulo)
    {
        if (!Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado.'], 403);
        }

        // Deletar a imagem associada se existir
        if ($titulo->capa_url) {
            Storage::disk('public')->delete($titulo->capa_url);
        }

        $titulo->delete();
        return response()->json(null, 204);
    }
}