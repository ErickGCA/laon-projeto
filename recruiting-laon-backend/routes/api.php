<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TituloController;
use App\Http\Controllers\Api\GeneroController;   
use App\Http\Controllers\Api\DiretorController;  

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::apiResource('titulos', TituloController::class);
    
    Route::get('/generos', [GeneroController::class, 'index'])->name('generos.index');
    Route::get('/diretores', [DiretorController::class, 'index'])->name('diretores.index');

    // Route::apiResource('generos', GeneroController::class);
    // Route::apiResource('diretores', DiretorController::class);
});