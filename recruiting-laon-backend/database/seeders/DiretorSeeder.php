<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diretor; // Certifique-se que o namespace está correto

class DiretorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // ----- INÍCIO DO BLOCO DE DEBUG -----
        $instanciaDiretor = new Diretor();
        $nomeDaTabelaQueOMODELUsa = $instanciaDiretor->getTable();

        // Isso vai PARAR a execução e mostrar o nome da tabela que o model Diretor está usando.
        //dd('O Model Diretor acha que a tabela se chama: ' . $nomeDaTabelaQueOMODELUsa);
        // ----- FIM DO BLOCO DE DEBUG -----

        // O código abaixo não será executado por causa do dd() acima.
        Diretor::firstOrCreate(['nome' => 'Christopher Nolan']);
        Diretor::firstOrCreate(['nome' => 'Quentin Tarantino']);
        Diretor::firstOrCreate(['nome' => 'Greta Gerwig']);
        Diretor::firstOrCreate(['nome' => 'Denis Villeneuve']);
        Diretor::firstOrCreate(['nome' => 'Martin Scorsese']);
        Diretor::firstOrCreate(['nome' => 'Steven Spielberg']);
        Diretor::firstOrCreate(['nome' => 'James Cameron']);
        Diretor::firstOrCreate(['nome' => 'Hayao Miyazaki']);
    }
}