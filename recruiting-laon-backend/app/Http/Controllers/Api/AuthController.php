<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
    $validatedData = $request->validate([ // É bom atribuir a uma variável
        'nome' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'senha' => 'required|string|min:8|confirmed',
    ]);

    $userData = [
        'nome' => $validatedData['nome'],
        'email' => $validatedData['email'],
        'senha' => Hash::make($validatedData['senha']),
    ];

    //dd($userData); // Descomente para depurar. Isso vai parar a execução e mostrar os dados.
    \Illuminate\Support\Facades\Log::info('Dados do usuário para criar: ', $userData); // Alternativa com Log

        $user = User::create($userData);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'senha' => 'required|string',
        ]);

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->senha])) {
             return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
           'access_token' => $token,
           'token_type' => 'Bearer',
           'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logout realizado com sucesso']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}