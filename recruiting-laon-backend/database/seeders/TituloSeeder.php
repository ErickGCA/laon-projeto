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
                
        $acao = Genero::where('nome', 'Ação')->first();
        $aventura = Genero::where('nome', 'Aventura')->first();
        $comedia = Genero::where('nome', 'Comédia')->first();
        $drama = Genero::where('nome', 'Drama')->first();
        $fc = Genero::where('nome', 'Ficção Científica')->first();
        $suspense = Genero::where('nome', 'Suspense')->first();
        $terror = Genero::where('nome', 'Terror')->first();

        $nolan = Diretor::where('nome', 'Christopher Nolan')->first();
        $tarantino = Diretor::where('nome', 'Quentin Tarantino')->first();
        $spielberg = Diretor::where('nome', 'Steven Spielberg')->first();
        $villeneuve = Diretor::where('nome', 'Denis Villeneuve')->first();

        $titulo1 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Jojo Rabbit'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Jojo Rabbit',
                'ano' => 2019,
                'duracao' => 108,
                'sinopse' => 'Um jovem garoto na Alemanha nazista descobre que sua mãe está escondendo uma garota judia em seu sótão.',
                'elenco' => 'Roman Griffin Davis, Thomasin McKenzie, Scarlett Johansson',
                'premios' => 'Oscar de Melhor Roteiro Adaptado',
                'avaliacao' => 8.0,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/jojo_rabbit.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=e-O1_YJY4C4',
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
                'duracao' => 148,
                'sinopse' => 'Um ladrão que rouba informações ao entrar nos sonhos das pessoas.',
                'elenco' => 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
                'avaliacao' => 8.8,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/a_origem_poster.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=8hP9D6kZseM',
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
                'duracao' => 55,
                'sinopse' => 'Uma minissérie que dramatiza a história do desastre nuclear de Chernobyl.',
                'elenco' => 'Jared Harris, Stellan Skarsgård, Emily Watson',
                'avaliacao' => 9.4,
                'estado_serie' => 'finalizada',
                'numero_temporadas' => 1,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/chernobyl_poster.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=0-836K_g0_A',
            ]
        );
        if ($serie1 && $drama) $serie1->generos()->syncWithoutDetaching([$drama->id]);


        $titulo3 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Interestelar'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Interstellar',
                'ano' => 2014,
                'duracao' => 169,
                'sinopse' => 'As aventuras de um grupo de exploradores que faz uso de um buraco de minhoca recém-descoberto para superar as limitações de uma viagem espacial humana e conquistar vastas distâncias em uma jornada interestelar.',
                'elenco' => 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
                'avaliacao' => 8.6,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/placeholder_poster.jpg',
                'trailer_url' => 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
            ]
        );
        if ($titulo3 && $fc) $titulo3->generos()->syncWithoutDetaching([$fc->id]);
        if ($titulo3 && $drama) $titulo3->generos()->syncWithoutDetaching([$drama->id]);
        if ($titulo3 && $nolan) $titulo3->diretores()->syncWithoutDetaching([$nolan->id]);

        $titulo4 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Pulp Fiction: Tempo de Violência'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Pulp Fiction',
                'ano' => 1994,
                'duracao' => 154,
                'sinopse' => 'As vidas de dois assassinos da máfia, um boxeador, a esposa de um gângster e um par de bandidos se entrelaçam em quatro contos de violência e redenção.',
                'elenco' => 'John Travolta, Uma Thurman, Samuel L. Jackson',
                'avaliacao' => 8.9,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/pulp_fiction.jpg',
            ]
        );
        if ($titulo4 && $drama) $titulo4->generos()->syncWithoutDetaching([$drama->id]); 
        if ($titulo4 && $tarantino) $titulo4->diretores()->syncWithoutDetaching([$tarantino->id]);

        $serie2 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Stranger Things'],
            [
                'tipo' => 'serie',
                'ano' => 2016,
                'duracao' => 44,
                'sinopse' => 'Quando um garoto desaparece, sua mãe, um chefe de polícia e seus amigos devem confrontar forças sobrenaturais aterrorizantes para trazê-lo de volta.',
                'elenco' => 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
                'avaliacao' => 8.7,
                'estado_serie' => 'em andamento', 
                'numero_temporadas' => 4, 
                'idioma' => 'Inglês',
                'capa_url' => 'posters/stranger.jpeg',
            ]
        );
        if ($serie2 && $drama) $serie2->generos()->syncWithoutDetaching([$drama->id]);
        if ($serie2 && $fc) $serie2->generos()->syncWithoutDetaching([$fc->id]);
        if ($serie2 && $terror) $serie2->generos()->syncWithoutDetaching([$terror->id]);


        $titulo5 = Titulo::firstOrCreate(
            ['titulo_pt' => 'O Poderoso Chefão'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'The Godfather',
                'ano' => 1972,
                'duracao' => 175,
                'sinopse' => 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu relutante filho.',
                'elenco' => 'Marlon Brando, Al Pacino, James Caan',
                'avaliacao' => 9.2,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/chefe.jpg',
            ]
        );
        if ($titulo5 && $drama) $titulo5->generos()->syncWithoutDetaching([$drama->id]);

        $titulo6 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Duna'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Dune',
                'ano' => 2021,
                'duracao' => 155,
                'sinopse' => 'A jornada de Paul Atreides, um jovem brilhante e talentoso nascido com um grande destino além de seu entendimento, que deve viajar para o planeta mais perigoso do universo para garantir o futuro de sua família e de seu povo.',
                'elenco' => 'Timothée Chalamet, Rebecca Ferguson, Oscar Isaac',
                'avaliacao' => 8.0,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/Dune_2021.jpeg',
            ]
        );
        if ($titulo6 && $fc) $titulo6->generos()->syncWithoutDetaching([$fc->id]);
        if ($titulo6 && $aventura) $titulo6->generos()->syncWithoutDetaching([$aventura->id]);
        if ($titulo6 && $drama) $titulo6->generos()->syncWithoutDetaching([$drama->id]);
        if ($titulo6 && $villeneuve) $titulo6->diretores()->syncWithoutDetaching([$villeneuve->id]);

        $serie3 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Breaking Bad: A Química do Mal'],
            [   
                'tipo' => 'serie',
                'titulo_original' => 'Breaking Bad',
                'ano' => 2008,
                'duracao' => 47,
                'sinopse' => 'Um professor de química do ensino médio diagnosticado com câncer de pulmão inoperável se volta para a fabricação e venda de metanfetamina para garantir o futuro financeiro de sua família.',
                'elenco' => 'Bryan Cranston, Aaron Paul, Anna Gunn',
                'avaliacao' => 9.5,
                'estado_serie' => 'finalizada',
                'numero_temporadas' => 5,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/big-poster-serie-breaking-bad-lo02-tamanho-90x60-cm-poster.jpg',
            ]
        );
        if ($serie3 && $drama) $serie3->generos()->syncWithoutDetaching([$drama->id]);
        if ($serie3 && $suspense) $serie3->generos()->syncWithoutDetaching([$suspense->id]);

        $titulo7 = Titulo::firstOrCreate(
            ['titulo_pt' => 'A Lista de Schindler'],
            [
                'tipo' => 'filme',
                'titulo_original' => 'Schindler\'s List',
                'ano' => 1993,
                'duracao' => 195,
                'sinopse' => 'Na Polônia ocupada pelos alemães durante a Segunda Guerra Mundial, o industrial Oskar Schindler gradualmente se preocupa com sua força de trabalho judaica depois de testemunhar sua perseguição pelos nazistas.',
                'elenco' => 'Liam Neeson, Ralph Fiennes, Ben Kingsley',
                'avaliacao' => 9.0,
                'idioma' => 'Inglês',
                'capa_url' => 'posters/SchindlerPoster.jpg',
            ]
        );
        if ($titulo7 && $drama) $titulo7->generos()->syncWithoutDetaching([$drama->id]);
        if ($titulo7 && $spielberg) $titulo7->diretores()->syncWithoutDetaching([$spielberg->id]);

        $titulo8 = Titulo::firstOrCreate(
            ['titulo_pt' => 'Parasita'],
            [
                'tipo' => 'filme',
                'titulo_original' => '기생충 (Gisaengchung)',
                'ano' => 2019,
                'duracao' => 132,
                'sinopse' => 'Ganância e discriminação de classe ameaçam o relacionamento simbiótico recém-formado entre a rica família Park e o pobre clã Kim.',
                'elenco' => 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong',
                'avaliacao' => 8.5,
                'idioma' => 'Coreano',
                'capa_url' => 'posters/parasita.jpg',
            ]
        );
        if ($titulo8 && $drama) $titulo8->generos()->syncWithoutDetaching([$drama->id]);
        if ($titulo8 && $suspense) $titulo8->generos()->syncWithoutDetaching([$suspense->id]);

        $serie4 = Titulo::firstOrCreate(
            ['titulo_pt' => 'The Mandalorian'],
            [
                'tipo' => 'serie',
                'ano' => 2019,
                'sinopse' => 'As viagens de um caçador de recompensas solitário nos confins da galáxia, longe da autoridade da Nova República.',
                'elenco' => 'Pedro Pascal',
                'avaliacao' => 8.7,
                'estado_serie' => 'em andamento',
                'numero_temporadas' => 3, 
                'idioma' => 'Inglês',
                'capa_url' => 'posters/mandarol.jpg',
            ]
        );
        if ($serie4 && $acao) $serie4->generos()->syncWithoutDetaching([$acao->id]);
        if ($serie4 && $aventura) $serie4->generos()->syncWithoutDetaching([$aventura->id]);
        if ($serie4 && $fc) $serie4->generos()->syncWithoutDetaching([$fc->id]);

        $titulo9 = Titulo::firstOrCreate(
            ['titulo_pt' => 'A Viagem de Chihiro'],
            [
                'tipo' => 'filme',
                'titulo_original' => '千と千尋の神隠し (Sen to Chihiro no Kamikakushi)',
                'ano' => 2001,
                'duracao' => 125,
                'sinopse' => 'Durante a mudança de sua família para o subúrbio, uma menina mal-humorada de 10 anos vagueia por um mundo governado por deuses, bruxas e espíritos, e onde os humanos são transformados em bestas.',
                'elenco' => 'Rumi Hiiragi, Miyu Irino, Mari Natsuki (vozes originais)',
                'avaliacao' => 8.6,
                'idioma' => 'Japonês',
                'capa_url' => 'posters/250px-A_Viagem_de_Chihiro.jpeg',
            ]
        );
        //if ($titulo9 && $animacao) $titulo9->generos()->syncWithoutDetaching([$animacao->id]);
       //if ($titulo9 && $aventura) $titulo9->generos()->syncWithoutDetaching([$aventura->id]);
    }
}