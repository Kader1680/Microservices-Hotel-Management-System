<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SanctumAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = str_replace('Bearer ', '', $token);

        try {
            // Verify token with Auth Service
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $token,
                'Accept' => 'application/json',
            ])->get('http://localhost:8001/api/user');

            // Check if token is invalid
            if ($response->status() === 401) {
                return response()->json(['error' => 'Invalid Token'], 401);
            }

            // If Auth Service fails or is down, return a proper error
            if ($response->failed()) {
                return response()->json(['error' => 'Auth Service Unavailable'], 503);
            }

            // Store user data in request
            $request->merge(['user' => $response->json()]);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Auth Service Unreachable'], 503);
        }
    }
}
