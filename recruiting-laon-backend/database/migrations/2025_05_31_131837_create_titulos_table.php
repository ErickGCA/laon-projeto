<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitulosTable extends Migration
{
    public function up()
    {
        Schema::create('titulos', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', ['filme', 'serie']);
            $table->string('titulo_original')->nullable();
            $table->string('titulo_pt');
            $table->year('ano')->nullable();
            $table->text('sinopse')->nullable();
            $table->text('elenco')->nullable();
            $table->text('premios')->nullable();
            $table->decimal('avaliacao', 3, 1)->nullable();
            $table->enum('estado_serie', ['finalizada', 'cancelada', 'em andamento', 'piloto'])->nullable();
            $table->integer('numero_temporadas')->nullable();
            $table->string('idioma')->nullable();
            $table->string('capa_url')->nullable(); // URL para a imagem da capa
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('titulos');
    }
}