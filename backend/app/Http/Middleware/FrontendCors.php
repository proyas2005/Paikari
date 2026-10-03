<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FrontendCors
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $request->isMethod('OPTIONS')
            ? response('', 204)
            : $next($request);

        $response->headers->set(
            'Access-Control-Allow-Origin',
            rtrim((string) config('app.frontend_url'), '/')
        );

        $response->headers->set(
            'Access-Control-Allow-Credentials',
            'true'
        );

        $response->headers->set(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS'
        );

        $response->headers->set(
            'Access-Control-Allow-Headers',
            'Content-Type, Accept, X-CSRF-TOKEN'
        );

        $response->headers->set('Vary', 'Origin');

        return $response;
    }
}