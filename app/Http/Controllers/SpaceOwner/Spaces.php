<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class Spaces extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/MySpaces/MySpaces");
    }

    function add(Request $request){
        return Inertia::render("UserPages/SpaceOwner/MySpaces/AddSpace",[

        ]);
    }
}
