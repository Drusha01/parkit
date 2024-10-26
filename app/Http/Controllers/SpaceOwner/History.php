<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class History extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/History/History");
    }
}
