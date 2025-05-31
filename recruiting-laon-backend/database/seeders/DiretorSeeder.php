<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diretor; // Certifique-se que o namespace do seu Model Diretor está correto

class DiretorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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