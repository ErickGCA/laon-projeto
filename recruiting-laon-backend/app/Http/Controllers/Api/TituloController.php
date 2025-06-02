<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Titulo;
use Illuminate\Http\Request;
use App\Http\Resources\TituloResource;
use App\Http\Resources\TituloCollection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate; // Importe o Gate facade

class TituloController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \App\Http\Resources\TituloCollection
     */
    public function index()
    {
        // Qualquer usuário logado pode listar os títulos
        return new TituloCollection(Titulo::with(['generos', 'diretores'])->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response|\App\Http\Resources\TituloResource
     */
    public function store(Request $request)
    {
        // Verifica se o usuário autenticado pode 'manage-titles'
        if (! Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado. Apenas administradores podem criar títulos.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'required|string|max:255',
            'tipo' => 'required|in:filme,serie',
            'ano' => 'nullable|integer|digits:4',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'duracao' => 'nullable|string|max:100', // Adicionado para consistência com o resource
            'trailer_url' => 'nullable|url|max:500', // Adicionado
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id',
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id',
            'capa_url' => 'nullable|image|mimes:jpg,png,jpeg|max:2048', // Mudado de 'url' para 'string' se for apenas o caminho relativo
                                                   // Se for uma URL completa, mantenha 'url'.
                                                   // Se for upload de arquivo, a validação será diferente.
            // Adicione validações para outros campos se necessário:
            // 'titulo_original' => 'nullable|string|max:255',
            // 'sinopse' => 'nullable|string',
            // 'elenco' => 'nullable|string',
            // 'premios' => 'nullable|string',
            // 'estado_serie' => 'nullable|in:finalizada,cancelada,em andamento,piloto',
            // 'numero_temporadas' => 'nullable|integer|min:1',
            // 'idioma' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Lembre-se de adicionar 'duracao' e 'trailer_url' ao $fillable do Model Titulo
        $titulo = Titulo::create($request->only([
            'titulo_pt', 'titulo_original', 'tipo', 'ano', 'sinopse', 'elenco',
            'premios', 'avaliacao', 'estado_serie', 'numero_temporadas', 'idioma', 'capa_url',
            'duracao', 'trailer_url' // Adicionados
        ]));

        if ($request->has('generos')) {
            $titulo->generos()->sync($request->generos);
        }
        if ($request->has('diretores')) {
            $titulo->diretores()->sync($request->diretores);
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Titulo  $titulo
     * @return \App\Http\Resources\TituloResource
     */
    public function show(Titulo $titulo)
    {
        // Qualquer usuário logado pode ver detalhes de um título
        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Titulo  $titulo
     * @return \Illuminate\Http\Response|\App\Http\Resources\TituloResource
     */
    public function update(Request $request, Titulo $titulo)
    {
        if (! Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado. Apenas administradores podem atualizar títulos.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'titulo_pt' => 'sometimes|required|string|max:255',
            'tipo' => 'sometimes|required|in:filme,serie',
            'ano' => 'nullable|integer|digits:4',
            'avaliacao' => 'nullable|numeric|min:0|max:10',
            'duracao' => 'nullable|string|max:100',
            'trailer_url' => 'nullable|url|max:500',
            'generos' => 'nullable|array',
            'generos.*' => 'integer|exists:generos,id',
            'diretores' => 'nullable|array',
            'diretores.*' => 'integer|exists:diretores,id',
            'capa_url' => 'nullable|image|mimes:jpg,png,jpeg|max:2048', // Mesma observação do store
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $titulo->update($request->only([
            'titulo_pt', 'titulo_original', 'tipo', 'ano', 'sinopse', 'elenco',
            'premios', 'avaliacao', 'estado_serie', 'numero_temporadas', 'idioma', 'capa_url',
            'duracao', 'trailer_url'
        ]));

        if ($request->has('generos')) {
            $titulo->generos()->sync($request->generos);
        } else {
            // Se o campo 'generos' não for enviado, mas você quiser remover todos os gêneros existentes:
            // $titulo->generos()->sync([]); 
            // Ou, se quiser manter os existentes se o campo não for enviado, não faça nada.
        }

        if ($request->has('diretores')) {
            $titulo->diretores()->sync($request->diretores);
        } else {
            // Mesma lógica para diretores
            // $titulo->diretores()->sync([]);
        }

        return new TituloResource($titulo->load(['generos', 'diretores']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Titulo  $titulo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Titulo $titulo)
    {
        if (! Gate::allows('manage-titles')) {
            return response()->json(['message' => 'Não autorizado. Apenas administradores podem deletar títulos.'], 403);
        }

        $titulo->delete();
        return response()->json(null, 204);
    }
}
