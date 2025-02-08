<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Scanner extends Controller
{
    public function index(Request $request){
        $data = $request->session()->all();

        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        
        return Inertia("UserPages/SpaceOwner/Scan/Scan",[
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types
        ]);
    }
}
