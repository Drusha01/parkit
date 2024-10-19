<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Login extends Controller
{
    function login(){
        return Inertia("Authentication/Login");
    }
}
