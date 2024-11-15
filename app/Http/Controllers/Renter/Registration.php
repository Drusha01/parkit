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
        $nationalities = DB::table("nationality")
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


        $license = DB::table('licenses as l')
            ->select(
                'l.id',
                'l.user_id',
                'l.is_approved' ,
                'l.nationality_id',
                'l.weight' ,
                'l.height' ,
                'l.license_no' ,
                'l.expiration_date',
                'l.agency_code' ,
                'l.blood_type_id' ,
                'l.eye_color_id',
                'l.license_condition_id' ,
                'l.restriction_codes' ,
                'l.picture_of_license' ,
                'l.picture_holding_license',          
                'l.date_created' ,
                'l.date_updated',
                'n.name as nationality'
            )
            ->join('nationality as n','n.id','l.nationality_id')
            ->where("user_id","=",$data['user_id'])
            ->first();

        $vehicles = DB::table('vehicles')
                ->select(
                    'id' ,
                    'user_id' ,
                    'is_approved' ,
                    'vehicle_type_id' ,
                    'cr_file_number' ,
                    'cr_plate_number',
                    'cr_no' ,
                    'cr_vehicle_owner',
                    'cr_picture' ,
                    'or_picture' ,
                    'or_expiration_date' ,
                    'or_color' ,
                    'front_side_picture' ,
                    'back_side_picture' ,
                    'left_side_picture' ,
                    'right_side_picture',
                    'date_created',
                    'date_updated',
                )
            ->where('user_id','=',$data['user_id'])
            ->get()
            ->toArray();

            
        return Inertia::render("UserPages/Renter/Registration/Registration",[
            "user"=>$user,
            'nationalities'=>$nationalities,
            'blood_types'=> $blood_types,
            'eye_colors'=> $eye_colors,
            'license_conditions'=>$license_conditions,
            'vehicle_types'=>$vehicle_types,
            'regions'=>$regions,
            'provinces'=>$provinces,
            'cities'=>$cities,
            'barangays'=>$barangays,
            'license'=>$license,
            'vehicles'=>$vehicles
        ]);
    }
    
}
