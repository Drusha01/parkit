<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Logout extends Controller
{
    function index (Request $request){
        $data = $request->session()->all();
        DB::table("logs")
        ->insert([
            'created_by'=> $data['user_id'],
            'log_details' => 'user has logout on '. $request->ip(),
            'link'=> "",
        ]);
        $request->session()->invalidate();
        return redirect("/login");
    }
}
