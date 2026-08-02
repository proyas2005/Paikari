<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data)
    {
        return User::create([

            'name' => $data['name'],

            'email' => $data['email'],

            'password' => Hash::make(
                $data['password']
            ),

            'role' => $data['role'],

        ]);
    }

    public function login(array $credentials)
    {
        $token = Auth::guard('api')->attempt([
            'email' => $credentials['email'],
            'password' => $credentials['password'],
        ]);

        if (!$token) {
            return null;
        }

        return [

            'token' => $token,

            'user' => Auth::guard('api')->user(),

        ];
    }
    public function logout(): void
    {
        auth('api')->logout();
    }
    public function me()
    {
        return auth('api')->user();
    }
    
}