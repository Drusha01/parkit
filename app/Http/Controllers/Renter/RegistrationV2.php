<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class RegistrationV2 extends Controller
{
    public function index(Request $request){
        $data = $request->session()->all();
     
        $user = DB::table("users as u")
            ->select([
                'u.id' ,
                'u.user_login_type_id' ,
                'u.sex_id',
                'u.gender_id' ,
                'u.google_oauth_id' ,
                'u.facebook_oauth_id' ,
                'u.username' ,
                'u.is_admin' ,
                'u.is_space_owner' ,
                'u.first_name' ,
                'u.middle_name',
                'u.last_name' ,
                'u.suffix' ,
                'u.birthdate' ,
                'u.email' ,
                'u.email_verified' ,
                'u.mobile_number',
                'u.mobile_number_verified',
                'u.profile',
                'u.region_id',
                'u.province_id',
                'u.city_id',
                'u.brgy_id',
                'u.date_created',
                'u.date_updated' ,
                'r.regDesc as region',
                'p.provDesc as province',
                'c.citymunDesc as city',
                'b.brgyDesc as brgy',
                'u.street'          
            ])
            ->leftjoin('refregion as r','r.id','u.region_id')
            ->leftjoin('refprovince as p','p.id','u.province_id')
            ->leftjoin("refcitymun as c",'u.city_id','c.id')
            ->leftjoin('refbrgy as b','u.brgy_id','b.id')
            ->where("u.id",'=',$data['user_id'])
            ->get()
            ->first();
        $regions = DB::table("refregion")
            ->orderby("regDesc","asc")
            ->get()
            ->toArray();

        $provinces = DB::table("refprovince")
            ->orderby('provDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();

        $cities = DB::table("refcitymun")
            ->orderBy('citymunDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();
        $barangays =DB::table("refbrgy")
            ->orderBy('brgyDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        return Inertia::render("UserPages/Renter/Registration2/Registration2",[
            "user"=>$user,
            'regions'=>$regions,
            'provinces'=>$provinces,
            'cities'=>$cities,
            'barangays'=>$barangays,
            'vehicle_types'=>$vehicle_types,
        ]);
    }
}
