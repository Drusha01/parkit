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
            ])
            // ->join('refregion as r','r.id','u.region_id')
            // ->leftjoin('refprovince as p','u.province_id','p.id')
            // ->leftjoin('refcitymun as c','u.city_id','c.id')
            // ->leftjoin('refbrgy as b','u.brgy_id','b.id')
            ->where("id",'=',$data['user_id'])
            ->get()
            ->first();
            // dd($user );
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
            ->where("id",'=',$user->region_id)
            ->orderby("regDesc","asc")
            ->get()
            ->toArray();

        $provinces = DB::table("refprovince")
        ->where("id",'=',$user->province_id)
            ->orderby('provDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();

        $city = DB::table("refcitymun")
            ->where("id",'=',$user->city_id)
            ->orderBy('citymunDesc','asc')
            ->limit(10)
            ->get()
            ->toArray();
        $barangays =DB::table("refbrgy")
            ->where("id",'=',$user->brgy_id)
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
            )
            ->where("user_id","=",$data['user_id'])
            ->first();

            
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
            'license'=>$license,
        ]);
    }
    function  store(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            "nationality_id" => 'required|integer|exists:nationality,id',
            "weight" => 'required|numeric|min:0',
            "sex_id" => 'required|integer|exists:sex,id',
            "height" => 'required|numeric|min:0',
            "expiration_date" =>  'required|date|date_format:Y-m-d|after:'.now()->toDateString(),
            "agency_code" =>  'required|max:255',
            "blood_type_id" => 'required|integer|exists:blood_types,id',
            "eye_color_id" => 'required|integer|exists:eye_colors,id',
            "license_condition_id" => 'required|integer|exists:license_conditions,id',
            "restriction_codes" =>  'required|max:255',
            ]
        );
       
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        if(DB::table("licenses")
            ->where("license_no",'=', $request->input('license_no'))
            ->where("is_approved",'=',1)
            ->where("user_id",'<>',$data['user_id'])
            ->first()
        ){
            return response()->json([
                'errors' => $messages = ['Lincense field'=>['License number is taken']],
            ], 422);
        }

        if($license = DB::table("licenses")
            ->where("user_id","=",$data['user_id'])
            ->get()
            ->first()
            ){
            $picture_of_license_file_name = $license->picture_of_license;
            $picture_holding_license_file_name = $license->picture_holding_license;
         
            if($request->file('picture_of_license')){
                $validator = Validator::make($request->all(), [
                    'picture_of_license' => [File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                    ]
                );
                $picture_of_license_file = $request->file('picture_of_license');
                $picture_of_license = $picture_of_license_file->store('picture_of_license'); 
                $picture_of_license_file_name = basename($picture_of_license);
            }
          
            if($request->file('picture_holding_license')){
                $validator = Validator::make($request->all(), [
                    'picture_holding_license' => [File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                    ]
                );
                $picture_of_license_file = $request->file('picture_holding_license');
                $picture_holding_license = $picture_of_license_file->store('picture_holding_license'); 
                $picture_holding_license_file_name = basename($picture_holding_license);
            }
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
            DB::table("licenses")
            ->where("user_id","=",$data['user_id'])
            ->update([
                "user_id" => $data['user_id'],
                "nationality_id" => $request->input('nationality_id'),
                "weight" => $request->input('weight'),
                "height" => $request->input('height'),
                "license_no" => $request->input('license_no'),
                "expiration_date" => $request->input('expiration_date'),
                "agency_code" => $request->input('agency_code'),
                "blood_type_id" => $request->input('blood_type_id'),
                "eye_color_id" => $request->input('eye_color_id'),
                "license_condition_id" => $request->input('license_condition_id'),
                'restriction_codes'=> $request->input('restriction_codes'),
                "picture_of_license" => $picture_of_license_file_name,
                "picture_holding_license" => $picture_holding_license_file_name,
            ]);
        }else{
            $validator = Validator::make($request->all(), [
                'picture_of_license' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'picture_holding_license' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
            $picture_of_license_file = $request->file('picture_of_license');
            $picture_of_license = $picture_of_license_file->store('picture_of_license'); 
            $picture_of_license_file_name = basename($picture_of_license);
            $picture_of_license_file = $request->file('picture_holding_license');
            $picture_holding_license = $picture_of_license_file->store('picture_holding_license'); 
            $picture_holding_license_file_name = basename($picture_holding_license);
            DB::table("licenses")
            ->insert([
                "id" => NULL,
                "user_id" => $data['user_id'],
                "nationality_id" => $request->input('nationality_id'),
                "weight" => $request->input('weight'),
                "height" => $request->input('height'),
                "license_no" => $request->input('license_no'),
                "expiration_date" => $request->input('expiration_date'),
                "agency_code" => $request->input('agency_code'),
                "blood_type_id" => $request->input('blood_type_id'),
                "eye_color_id" => $request->input('eye_color_id'),
                "license_condition_id" => $request->input('license_condition_id'),
                'restriction_codes'=> $request->input('restriction_codes'),
                "picture_of_license" => $picture_of_license_file_name,
                "picture_holding_license" => $picture_holding_license_file_name,
            ]);
        }
        return 1;
    }
}
