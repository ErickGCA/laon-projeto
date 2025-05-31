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
    $validatedData = $request->validate([
        'nome' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users', 
        'senha' => 'required|string|min:8|confirmed',
    ]);

    $userData = [
        'nome' => $validatedData['nome'],
        'email' => $validatedData['email'],
        'senha' => Hash::make($validatedData['senha']),
    ];

    \Illuminate\Support\Facades\Log::info('Dados do usuário para criar: ', $userData);

    try {
        $user = User::create($userData);

        if ($user) {
            \Illuminate\Support\Facades\Log::info('USUÁRIO CRIADO: ID ' . $user->id . ' Email: ' . $user->email);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user 
            ], 201);
        } else {
            \Illuminate\Support\Facades\Log::error('FALHA AO CRIAR USUÁRIO: User::create retornou null/false sem exceção.');
            return response()->json(['message' => 'Erro no servidor ao tentar criar usuário.'], 500);
        }
    } catch (\Illuminate\Database\QueryException $e) {
        \Illuminate\Support\Facades\Log::error('QueryException ao criar usuário: ' . $e->getMessage(), [
            'sql' => $e->getSql(),
            'bindings' => $e->getBindings()
        ]);
        return response()->json(['message' => 'Erro de banco de dados ao criar usuário.', 'error_details' => $e->getMessage()], 500);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error('Exception geral ao criar usuário: ' . $e->getMessage());
        return response()->json(['message' => 'Erro geral ao criar usuário.', 'error_details' => $e->getMessage()], 500);
    }
}

public function login(Request $request)
{
    $validatedData = $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string', 
    ]);

    $userFromDb = \App\Models\User::where('email', $validatedData['email'])->first();

    if ($userFromDb) {
        $passwordAttempt = $validatedData['password'];
        $hashedPasswordInDb = $userFromDb->senha; 

        if (\Illuminate\Support\Facades\Hash::check($passwordAttempt, $hashedPasswordInDb)) {
            \Illuminate\Support\Facades\Log::info('LOGIN DEBUG: Hash::check SUCESSO para ' . $validatedData['email']);
        } else {
            \Illuminate\Support\Facades\Log::info('LOGIN DEBUG: Hash::check FALHA para ' . $validatedData['email'] . '. Senha tentada: [' . $passwordAttempt . ']');
        }
    } else {
        \Illuminate\Support\Facades\Log::info('LOGIN DEBUG: Usuário não encontrado no DB: ' . $validatedData['email']);
    }

    if (!Auth::attempt(['email' => $validatedData['email'], 'password' => $validatedData['password']])) {
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

    $user = Auth::user(); 
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