<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function show_profile_picture(Request $request ,$filename)
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
    function show_picture_of_license(Request $request , $filename){
        $path = storage_path('app/private/picture_of_license/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
    function show_picture_holding_license(Request $request , $filename){
        $path = storage_path('app/private/picture_holding_license/' . $filename); 
        if (file_exists($path)) {
            $data = $request->session()->all();
            if(isset($data['user_id'])  ){
                return response()->file($path);
            }
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
}
