<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::firstOrCreate(
            ['email' => 'admin@laon.com'],
            [
                'nome' => 'Admin Laon',
                'senha' => Hash::make('erick123'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            GeneroSeeder::class,
            DiretorSeeder::class,
            TituloSeeder::class,

        ]);
    }
}