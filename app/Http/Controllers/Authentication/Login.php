<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Login extends Controller
{
    function index(){
        return Inertia("Authentication/Login");
    }

    function login(Request $request){
        dd($request);
        return "nice";
    }
}
