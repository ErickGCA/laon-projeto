
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTituloDiretorTable extends Migration
{
    public function up()
    {
        Schema::create('titulo_diretor', function (Blueprint $table) {
            $table->foreignId('titulo_id')->constrained('titulos')->onDelete('cascade');
            $table->foreignId('diretor_id')->constrained('diretores')->onDelete('cascade');
            $table->primary(['titulo_id', 'diretor_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('titulo_diretor');
    }
}