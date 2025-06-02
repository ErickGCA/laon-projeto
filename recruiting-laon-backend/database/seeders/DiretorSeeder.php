<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diretor; 

class DiretorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $instanciaDiretor = new Diretor();
        $nomeDaTabelaQueOMODELUsa = $instanciaDiretor->getTable();

        dd('O Model Diretor acha que a tabela se chama: ' . $nomeDaTabelaQueOMODELUsa);

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