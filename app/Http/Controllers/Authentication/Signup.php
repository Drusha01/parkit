<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use Mail;
class Signup extends Controller
{
    function index(){
        return Inertia("Authentication/Signup",[
            'title'=>"",
            'path'=>"/login"
        ]);
    }
    function index_space_owner(){
        return Inertia("Authentication/Signup",[
            'title'=>"Space Owner",
            'path'=>"/spaceowner/login"
        ]);
    }
      

    private $email;

    function send_email(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $this->email = $request->input("email");
        if(DB::table('users')
        ->where('email', $this->email)
        ->where('email_verified', 1)
        ->first()){
            return "user exist";
        }else{
            $code = rand(100000,1000000);
            Mail::send('mail.code-verification', [
                'code'=>$code,
                'email'=>$this->email], 
                function($message) {
                $message->to($this->email, $this->email)->subject
                ('Account Verification');
                $message->from('Parkakiofficial@gmail.com','ParkIt');
            });
            $deleted = DB::table('user_activations')
                ->where('email', '=', $this->email)
                ->delete();
            DB::table('user_activations')->insert([
                'email' => $this->email,
                'code' => $code,
                'count' => 0
            ]);
            $request->session()->put( 'email', $this->email);
        }
        return response()->json([
            1,
        ], 200);
    }

    function verify_code(Request $request){
        $data = $request->session()->all();
        $email = $request->input("email");
        $code = $request->input("code");
        if (isset($data['email'])){
            // $request->session()->forget('email');
            $user_activation = DB::table('user_activations')
            ->select('id', 'email', 'code','count','date_created', 'date_updated',DB::raw('NOW() as time_now'))
            ->where('email',$email)
            ->first();
            if(1){
                if($user_activation && $user_activation->code == $code){
                    if($user_activation->count<=4){
                            // save into session
                        $request->session()->put('sign_up', true);
                        return response()->json(
                        1   , status: 200);
                    }else{
                        $deleted = DB::table('user_activations')
                        ->where('email', '=', $this->email)
                        ->delete();
                        return response()->json([
                            "errors"=> [
                                "Code Expires"=>["Too many tries, code expires!"]
                            ],
                        ], status: 422);
                    }
                }else{
                    if($user_activation && $user_activation->count<4){
                        DB::table('user_activations')
                        ->where('id', $user_activation->id)
                        ->update(['count' =>  $user_activation->count+1]);
                        return response()->json([
                            "errors"=> [
                                "Code Invalid"=>["Invalid code, you have ".(5 - $user_activation->count - 1)." tries!"]
                            ],
                        ], status: 422);
                    }else{
                        DB::table('user_activations')
                        ->where('email', '=', $this->email)
                        ->delete();
                        $request->session()->forget('email');
                        return response()->json([
                            "errors"=> [
                                "Code Expires"=>["Too many tries, code expires!"]
                            ],
                        ], status: 422);
                    }
                } 
            }else{
                DB::table('user_activations')
                    ->where('email', '=', $this->email)
                    ->delete();
                $request->session()->forget('email');
            }         
        }else{
            return response()->json([
                "errors"=> [
                    "Code Expires"=>["Invalid!"]
                ],
            ], status: 422);
        }
    }
    function signup(Request $request){
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'gender' => 'required|integer',
            'email' => 'required|email|unique:users',
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // insert here 
        DB::table("users")->
        insert([
            'id' => NULL,
            'user_login_type_id'=> 1,
            'gender_id' => $request->input("gender"),
            'google_oauth_id' => NULL,
            'facebook_oauth_id' => NULL,
            'username' => NULL,
            'password' => password_hash($request->input("password"), PASSWORD_ARGON2I) ,
            'is_admin' => NULL,
            'is_space_owner' => NULL,
            'first_name' => $request->input("firstname"), 
            'middle_name' => $request->input("middlename"),
            'last_name' => $request->input("lastname"),
            'suffix' => $request->input("suffix"),
            'email' => $request->input("email"),
            'email_verified' => true,
            'mobile_number' =>NULL,
            'mobile_number_verified' =>NULL, 
        ]);

        // session
        $user = DB::table("users")
            ->select([
                "id",
                "email",
                "is_space_owner"])
            ->where("email","=",$request->input("email"))
            ->first();
        $request->session()->invalidate();
        $request->session()->put( 'user_id', $user->id);
        $request->session()->put( 'renter', true);
        $request->session()->put( 'space_owner', NULL);
        return 1;
    }
}
