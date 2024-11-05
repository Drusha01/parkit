<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;

class Login extends Controller
{
    function index(){
        return Inertia("Authentication/Login");
    }

    function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
        $user = DB::table("users as u")
            ->select([
                "id",
                "email",
                "is_space_owner",
                "password"
                ])
            ->where("email","=",$request->input("email"))
            ->first();

        if($user && password_verify($request->input("password"),$user->password)){
            $request->session()->invalidate();
            $request->session()->put( 'user_id', $user->id);
            $request->session()->put( 'renter', true);
            $request->session()->put( 'space_owner', $user->is_space_owner);
            return to_route('renter.profile.index');
        }else{
            return response()->json([
                "swal:fire"=> [
                    'position'=>"center",
                    'icon'=>"warning",
                    'title'=>"Invalid credentials!",
                    "showConfirmButton"=>"true",
                    "timer"=>1000,
                    "link"=>"#"
                ],
            ], status: 200);
        }
    }
}
