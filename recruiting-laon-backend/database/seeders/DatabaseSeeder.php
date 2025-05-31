<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create(); // Se quiser usuários de fábrica

        $this->call([
            GeneroSeeder::class,
            DiretorSeeder::class,
            // Adicione aqui o TituloSeeder se/quando você o criar
            // Ex: TituloSeeder::class,
        ]);
    }
}