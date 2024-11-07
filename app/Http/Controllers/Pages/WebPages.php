<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WebPages extends Controller
{
    function homepage(Request $request){
        $data = $request->session()->all();
        $user = [];
        if(isset($data['user_id'])){
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
        }
        return Inertia::render("webPages/Home",[
            "user"=>$user
        ]);
    }
    function browse(Request $request){
        return Inertia('webPages/Browse');
    }
    function howitworks(Request $request){
        return Inertia('webPages/HowItWorks');
    }
    function whyparkit(Request $request){
        return Inertia('webPages/WhyParkIt');
    }
    function aboutus(Request $request){
        return Inertia('webPages/AboutUs');
    }

}
