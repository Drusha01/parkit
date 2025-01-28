<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function profile_picture(Request $request ,$filename)
    {
        $path = storage_path('app/private/profile/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json(['error' => 'File not found'], 404);
    }
    function picture_of_license(Request $request , $filename){
        $path = storage_path('app/private/picture_of_license/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function picture_holding_license(Request $request , $filename){
        $path = storage_path('app/private/picture_holding_license/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function back_side_picture(Request $request , $filename){
        $path = storage_path('app/private/back_side_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function cor_picture(Request $request , $filename){
        $path = storage_path('app/private/cor_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function front_side_picture(Request $request , $filename){
        $path = storage_path('app/private/front_side_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function or_picture(Request $request , $filename){
        $path = storage_path('app/private/or_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function right_side_picture(Request $request , $filename){
        $path = storage_path('app/private/right_side_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function left_side_picture(Request $request , $filename){
        $path = storage_path('app/private/left_side_picture/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }

    function space_picture(Request $request , $filename){
        $path = storage_path('app/private/spaces_content/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function vehicle_type(Request $request , $filename){
        $path = storage_path('app/private/vehicle-types/' . $filename); 
        if (file_exists($path)) {
            return response()->file($path);
        }
    }
}
