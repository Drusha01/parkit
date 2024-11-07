<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Logout extends Controller
{
    function index (Request $request){
        $request->session()->invalidate();
        return redirect("/login");
    }
}
