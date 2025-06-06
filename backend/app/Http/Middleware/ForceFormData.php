<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceFormData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
       if ($request->isMethod('PUT') || $request->isMethod('PATCH')) {
        $request->headers->set('Content-Type', 'application/x-www-form-urlencoded');
    }
    return $next($request);
    }
}
