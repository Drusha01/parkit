<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Profile extends Controller
{
    function index(Request $request){
        $data = $request->session()->all();
        $user = DB::table("users")
        ->select([
            'id' ,
            'user_login_type_id' ,
            'gender_id' ,
            'google_oauth_id' ,
            'facebook_oauth_id' ,
            'username' ,
            'is_admin' ,
            'is_space_owner' ,
            'first_name' ,
            'middle_name',
            'last_name' ,
            'suffix' ,
            'birthdate' ,
            'email' ,
            'email_verified' ,
            'mobile_number',
            'mobile_number_verified',
            'profile',
            'date_created',
            'date_updated' ,
        ])
        ->where("id",'=',$data['user_id'])
        ->first();
        return Inertia::render("UserPages/Renter/Profile/Profile",[
            "user"=>$user
        ]);
    }
    function store(Request $request){
        dd($request->file('file'),$request->input());
    }
}
