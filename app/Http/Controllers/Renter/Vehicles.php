<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

use function PHPUnit\Framework\fileExists;

class Vehicles extends Controller
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
        return Inertia::render("UserPages/Renter/MyVehicles/MyVehicles",[
            "user"=>$user
        ]);
    }
    function  store(Request $request){
        $data = $request->session()->all();

        
        if($request->input("id") && 
        ($vehicle = DB::table("vehicles")
        ->where('user_id','=',$data['user_id'])
        ->where('id','=',$request->input("id"))
        ->first()
        )){
            
            $validator = Validator::make($request->all(), [
                'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
                'cr_file_number'=>'required|max:255',
                'cr_plate_number'=>'required|max:255',
                'cr_no'=>'required|max:255',
                'cr_vehicle_owner'=>'required|max:255',
                'or_expiration_date'=>  'required|date|date_format:Y-m-d|after:'.now()->toDateString(),
                'or_color'=>'required|max:255',
                ]
            );

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
          
            if($request->file('cr_picture')){
                $validator = Validator::make($request->all(), [
                    'cr_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->cr_picture =  self::store_image($request->file('cr_picture'),'cr_picture');
            }

            if($request->file('or_picture')){
                $validator = Validator::make($request->all(), [
                    'or_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->or_picture =  self::store_image($request->file('or_picture'),'or_picture');
            }

            if($request->file('front_side_picture')){
                $validator = Validator::make($request->all(), [
                    'front_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->front_side_picture =  self::store_image($request->file('front_side_picture'),'front_side_picture');
            }

            if($request->file('back_side_picture')){
                $validator = Validator::make($request->all(), [
                    'back_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->back_side_picture =  self::store_image($request->file('back_side_picture'),'back_side_picture');
            }
           
            if($request->file('right_side_picture')){
                $validator = Validator::make($request->all(), [
                    'right_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->right_side_picture =  self::store_image($request->file('right_side_picture'),'right_side_picture');
            }
            if($request->file('left_side_picture')){
                $validator = Validator::make($request->all(), [
                    'left_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $path = storage_path('app/private/left_side_picture/'. $vehicle->left_side_picture);
                if(file_exists($path)){
                    unlink($path);
                }
                $vehicle->left_side_picture =  self::store_image($request->file('left_side_picture'),'left_side_picture');
            }
            DB::table('vehicles')
                ->where('user_id','=',$data['user_id'])
                ->where('id','=',$request->input('id'))
                ->update([
                    'vehicle_type_id'=> $request->input('vehicle_type_id'),
                    'cr_file_number'=>$request->input('cr_file_number'),
                    'cr_plate_number'=>$request->input('cr_plate_number'),
                    'cr_no'=>$request->input('cr_no'),
                    'cr_vehicle_owner'=>$request->input('cr_vehicle_owner'),
                    'or_expiration_date'=>$request->input('or_expiration_date'),
                    'or_color'=>$request->input('or_color'),
                    'cr_picture' => $vehicle->cr_picture,
                    'or_picture' => $vehicle->or_picture,
                    'front_side_picture' => $vehicle->front_side_picture,
                    'back_side_picture' => $vehicle->back_side_picture,
                    'right_side_picture' => $vehicle->right_side_picture,
                    'left_side_picture' => $vehicle->left_side_picture,
                ]);
        }else{
            
            $validator = Validator::make($request->all(), [
                'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
                'cr_file_number'=>'required|max:255',
                'cr_plate_number'=>'required|max:255',
                'cr_no'=>'required|max:255',
                'cr_vehicle_owner'=>'required|max:255',
                'or_expiration_date'=>  'required|date|date_format:Y-m-d|after:'.now()->toDateString(),
                'or_color'=>'required|max:255',
                'cr_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'or_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'front_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'back_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'right_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'left_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }

            DB::table('vehicles')
            ->insert([
                'user_id'=>$data['user_id'],
                'vehicle_type_id'=> $request->input('vehicle_type_id'),
                'cr_file_number'=>$request->input('cr_file_number'),
                'cr_plate_number'=>$request->input('cr_plate_number'),
                'cr_no'=>$request->input('cr_no'),
                'cr_vehicle_owner'=>$request->input('cr_vehicle_owner'),
                'or_expiration_date'=>$request->input('or_expiration_date'),
                'or_color'=>$request->input('or_color'),
                'cr_picture' => self::store_image($request->file('cr_picture'),'cr_picture'),
                'or_picture' => self::store_image($request->file('or_picture'),'or_picture'),
                'front_side_picture' => self::store_image($request->file('front_side_picture'),'front_side_picture'),
                'back_side_picture' => self::store_image($request->file('back_side_picture'),'back_side_picture'),
                'right_side_picture' => self::store_image($request->file('right_side_picture'),'right_side_picture'),
                'left_side_picture' => self::store_image($request->file('left_side_picture'),'left_side_picture'),
            ]);
            return 1;
        }
    }
    function store_image($file_input,$folder){
        return basename($file_input->store($folder)); 
    }
}
