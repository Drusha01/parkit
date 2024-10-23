<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Spaces extends Controller
{
    function index(){
        return "spaceowner spaces";
    }
}
