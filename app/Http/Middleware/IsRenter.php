<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Redirect;
use Symfony\Component\HttpFoundation\Response;

class IsRenter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $data = $request->session()->all();
        if($data['is_admin'] == 1){
            return to_route('admin.default.index');
        }
        return $next($request);
    }
}
