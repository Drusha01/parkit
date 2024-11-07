<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Profile extends Controller
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
        return Inertia::render("UserPages/Renter/Profile/Profile",[
            "user"=>$user
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
            'birthdate'=> 'required|date|date_format:Y-m-d|before:'.now()->subYears(18)->toDateString()
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
}
