<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Profile extends Controller
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
        ->where("id",'=',$data['user_id'])
        ->first();

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
        return Inertia::render("UserPages/Renter/Profile/Profile",[
            "user"=>$user,
            'regions'=>$regions,
            'provinces'=>$provinces,
            'city'=>$city,
            'barangays'=>$barangays,
        ]);
    }
    function store(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'gender_id' => 'required|integer|exists:genders,id',
            'sex_id' => 'required|integer|exists:sex,id',
            'mobile_number' => 'required|numeric',Rule::unique('users')->ignore($data["user_id"]),
            'birthdate'=> 'required|date|date_format:Y-m-d|before:'.now()->subYears(18)->toDateString(),
            'region_id' => 'required|integer|exists:refregion,id',
            'province_id' => 'required|integer|exists:refprovince,id',
            'city_id' => 'required|integer|exists:refcitymun,id',
            'brgy_id' => 'required|integer|exists:refbrgy,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        DB::table("users")
        ->where("id","=",$data["user_id"])
        ->update([
            "first_name" => $request->input('first_name'),
            "middle_name" => $request->input('middle_name'),
            "last_name" => $request->input('last_name'),
            "suffix" => $request->input('suffix'),
            "mobile_number" => $request->input('mobile_number'),
            "gender_id" => $request->input('gender_id'),
            "sex_id" => $request->input('sex_id'),
            "birthdate" => $request->input('birthdate'),
            "region_id" => $request->input('region_id'),
            "province_id" => $request->input('province_id'),
            "city_id" => $request->input('city_id'),
            "brgy_id" => $request->input('brgy_id'),
        ]);
        return 1;
    }
    function update_image(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
        'image' => [
            'required',
            File::types(['png', 'jpg','jpeg'])
            ->max(12 * 1024)
            ]
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('profile'); 
            $fileName = basename($path);
            DB::table("users")
            ->where("id",'=',$data['user_id'])
            ->update([
                'profile'=>$fileName
            ]);
            return response()->json([
                'message' => 'File uploaded successfully!',
                'path' => $fileName,
            ]);
        }
    }
    function change_password(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
            'new_password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
            'confirm_password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        if($request->input('new_password') != $request->input('confirm_password')){
            return response()->json([
                'errors' => $messages = ["New password and confirm password doesn\'t match!"=>["New password and confirm password doesn\'t match!"]],
            ], 422);
        }
        if($request->input("password") == $request->input("new_password")){
            return response()->json([
                'errors' => $messages = ["New password shouldn't be the old password!"=>["New password shouldn't be the old password!"]],
            ], 422);
        }
        $user = DB::table("users")
            ->select(
                'id',
                'password',
            )
            ->where("id",'=',$data['user_id'])
            ->get()
            ->first();

        if(password_verify($request->input("password"),$user->password)){
            DB::table("users")
            ->where("id",'=',$data['user_id'])
            ->update([
                'password'=>    password_hash($request->input("new_password"), PASSWORD_ARGON2I)
            ]);
            return 1;
        }else{
            return response()->json([
                'errors' => $messages = ["Current password is invalid!"=>["Current password is invalid!"]],
            ], 422);
        }
    }
}
