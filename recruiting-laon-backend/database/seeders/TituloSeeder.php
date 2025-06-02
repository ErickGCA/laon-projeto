<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Titulo;
use App\Models\Genero;
use App\Models\Diretor;

class TituloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comedia = Genero::where('nome', 'Comédia')->first();
        $drama = Genero::where('nome', 'Drama')->first();
        $fc = Genero::where('nome', 'Ficção Científica')->first();
        $acao = Genero::where('nome', 'Ação')->first();

        $nolan = Diretor::where('nome', 'Christopher Nolan')->first();
        $tarantino = Diretor::where('nome', 'Quentin Tarantino')->first();

        $titulo1 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Jojo Rabbit'], 
            [ 
                'tipo' => 'filme',
                'titulo_original' => 'Jojo Rabbit',
                'ano' => 2019,
                'sinopse' => 'Um jovem garoto na Alemanha nazista descobre que sua mãe está escondendo uma garota judia em seu sótão.',
                'elenco' => 'Roman Griffin Davis, Thomasin McKenzie, Scarlett Johansson',
                'premios' => 'Oscar de Melhor Roteiro Adaptado',
                'avaliacao' => 8.0, 
                'idioma' => 'Inglês',
                'capa_url' => 'posters/jojo_rabbit.jpg', 
            ]
        );
        if ($titulo1 && $comedia) $titulo1->generos()->syncWithoutDetaching([$comedia->id]);
        if ($titulo1 && $drama) $titulo1->generos()->syncWithoutDetaching([$drama->id]);

        $titulo2 = Titulo::firstOrCreate(
            ['titulo_pt' => 'A Origem'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Inception',
                'ano' => 2010,
                'sinopse' => 'Um ladrão que rouba informações ao entrar nos sonhos das pessoas.',
                'elenco' => 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
                'avaliacao' => 8.8,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/placeholder_poster.jpg', 
            ]
        );
        if ($titulo2 && $fc) $titulo2->generos()->syncWithoutDetaching([$fc->id]);
        if ($titulo2 && $acao) $titulo2->generos()->syncWithoutDetaching([$acao->id]);
        if ($titulo2 && $nolan) $titulo2->diretores()->syncWithoutDetaching([$nolan->id]);


        $serie1 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Chernobyl'],
            [
                'tipo' => 'serie',
                'ano' => 2019,
                'sinopse' => 'Uma minissérie que dramatiza a história do desastre nuclear de Chernobyl.',
                'elenco' => 'Jared Harris, Stellan Skarsgård, Emily Watson',
                'avaliacao' => 9.4,
                'estado_serie' => 'finalizada',
                'numero_temporadas' => 1,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/placeholder_poster.jpg', 
            ]
        );
        if ($serie1 && $drama) $serie1->generos()->syncWithoutDetaching([$drama->id]);

    }
}