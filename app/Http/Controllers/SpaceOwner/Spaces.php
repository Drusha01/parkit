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
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        return Inertia::render("UserPages/SpaceOwner/MySpaces/AddSpace",[
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types
        ]);
    }
}
