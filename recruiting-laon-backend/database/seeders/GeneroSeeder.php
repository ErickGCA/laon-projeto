<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genero; 

class GeneroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Genero::firstOrCreate(['nome' => 'Ação']);
        Genero::firstOrCreate(['nome' => 'Comédia']);
        Genero::firstOrCreate(['nome' => 'Drama']);
        Genero::firstOrCreate(['nome' => 'Ficção Científica']);
        Genero::firstOrCreate(['nome' => 'Terror']);
        Genero::firstOrCreate(['nome' => 'Suspense']);
        Genero::firstOrCreate(['nome' => 'Romance']);
        Genero::firstOrCreate(['nome' => 'Animação']);
        Genero::firstOrCreate(['nome' => 'Documentário']);
        Genero::firstOrCreate(['nome' => 'Aventura']);
    }
}