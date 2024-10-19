<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Signup extends Controller
{
    function signup(){
        return Inertia("Authentication/Signup");
    }
}
