<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsAdminToUsersTable extends Migration // O nome da classe pode variar
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Adiciona a coluna depois da coluna 'senha' (ou onde preferir)
            $table->boolean('is_admin')->default(false)->after('senha');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_admin');
        });
    }
}