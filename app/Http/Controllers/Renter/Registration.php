<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class Registration extends Controller
{
    function index(Request $request){
        $data = $request->session()->all();
        $user = DB::table("users")
        ->select([
            'id' ,
            'user_login_type_id' ,
            'sex_id',
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

        $nationality = DB::table("nationality")
            ->where('name',"LIKE","Fil%")
            ->limit(10)
            ->orderby('name',"asc")
            ->get();
        $blood_types = DB::table("blood_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        $eye_colors = DB::table("eye_colors")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        $license_conditions = DB::table("license_conditions")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $regions = DB::table("refregion")
            ->orderby("regDesc","asc")
            ->get()
            ->toArray();

        $provinces = DB::table("refprovince")
            ->orderby('provDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();

        $city = DB::table("refcitymun")
            ->orderBy('citymunDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();

        $barangays =DB::table("refbrgy")
            ->orderBy('brgyDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();

        return Inertia::render("UserPages/Renter/Registration/Registration",[
            "user"=>$user,
            'nationality'=>$nationality,
            'blood_types'=> $blood_types,
            'eye_colors'=> $eye_colors,
            'license_conditions'=>$license_conditions,
            'vehicle_types'=>$vehicle_types,
            'regions'=>$regions,
            'provinces'=>$provinces,
            'city'=>$city,
            'barangays'=>$barangays,
        ]);
    }
}
