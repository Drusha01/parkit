<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ForgotPassword extends Controller
{
    function forgotpassword(){
        return Inertia("Authentication/ForgotPassword");
    }
}
