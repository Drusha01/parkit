<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;

class Login extends Controller
{
    function index(Request $request){
        $request->session()->put( 'path', "renter");
        return Inertia("Authentication/Login",[
            'title'=>"",
            'path'=>"/signup"
        ]);
    }

    function index_space_owner(Request $request){
        $request->session()->put( 'path', "spaceowner");
        return Inertia("Authentication/Login",[
            'title'=>"Space Owner",
            'path'=>"/spaceowner/signup"
        ]);
    }

    function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
        $user = DB::table("users as u")
            ->select(
                "id",
                "email",
                "is_space_owner",
                "password",
                'is_admin'
                )
            ->where("email","=",$request->input("email"))
            ->first();

        if($user && password_verify($request->input("password"),$user->password)){
            $request->session()->invalidate();
            $request->session()->put( 'user_id', $user->id);
            $request->session()->put( 'renter', true);
            $request->session()->put( 'space_owner', $user->is_space_owner);
            $request->session()->put( 'is_admin', $user->is_admin);
            DB::table("logs")
            ->insert([
                'created_by'=> $user->id,
                'log_details' => 'user has login on '. $request->ip(),
                'link'=> "",
            ]);
            return 1;
        }else{
            return response()->json([
                "errors"=> [
                    "Invalid"=>["Invalid credentials!"]
                ],
            ], status: 422);
        }
    }
}
