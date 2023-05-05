<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {

        try {
            JWTAuth::parseToken()->authenticate();
        } catch (\Throwable $E) {
            if ($E instanceof TokenInvalidException) {
                return response()->json(['error' => 'Token is invalid','code'=>10], 401);
            }
            if ($E instanceof TokenExpiredException) {
                return response()->json(['error' => 'Token is expired','code'=>11], 401);
            }
            return response()->json(['error' => 'Token not found','code'=>12], 401);
        }


        return $next($request);
    }
}
