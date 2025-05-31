<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTituloGeneroTable extends Migration
{
    public function up()
    {
        Schema::create('titulo_genero', function (Blueprint $table) {
            $table->foreignId('titulo_id')->constrained('titulos')->onDelete('cascade');
            $table->foreignId('genero_id')->constrained('generos')->onDelete('cascade');
            $table->primary(['titulo_id', 'genero_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('titulo_genero');
    }
}