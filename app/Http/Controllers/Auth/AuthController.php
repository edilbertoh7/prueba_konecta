<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:4|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = JWTAuth::fromUser($user);

        return response(['user' => $user, 'access_token' => $accessToken],201);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email','password');
        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json(['error' => 'Invalid credentials' ,'status'=>401],401);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Could not create token', 'status'=>500],500);
        }
        return response()->json(['user' => auth()->user(), 'access_token' => $token]);
    }
}
