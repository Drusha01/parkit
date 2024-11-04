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
        return Inertia("Authentication/Signup");
    }

    private $email;

    function send_email(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
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
                        return response()->json([
                           "swal:fire"=> [
                                'position'=>"center",
                                'icon'=>"success",
                                'title'=>"Verified!",
                                "showConfirmButton"=>"true",
                                "timer"=>1000,
                                "link"=>"#"
                            ],
                        ], status: 200);
                    }else{
                        $deleted = DB::table('user_activations')
                        ->where('email', '=', $this->email)
                        ->delete();
                        return response()->json([
                            "swal:fire"=> [
                                'position'=>"center",
                                'icon'=>"warning",
                                'title'=>"Too many tries, code expires!",
                                "showConfirmButton"=>"true",
                                "timer"=>1000,
                                "link"=>"#"
                            ],
                        ], status: 302);
                    }
                }else{
                    if($user_activation && $user_activation->count<4){
                        DB::table('user_activations')
                        ->where('id', $user_activation->id)
                        ->update(['count' =>  $user_activation->count+1]);
                        return response()->json([
                            "swal:fire"=> [
                                 'position'=>"center",
                                 'icon'=>"success",
                                 'title'=>"Invalid code, you have ".(5 - $user_activation->count - 1)." tries!",
                                 "showConfirmButton"=>"true",
                                 "timer"=>1000,
                                 "link"=>"#"
                             ],
                         ], status: 200);
                    }else{
                        DB::table('user_activations')
                        ->where('email', '=', $this->email)
                        ->delete();
                        $request->session()->forget('email');
                        return response()->json([
                            "swal:fire"=> [
                                'position'=>"center",
                                'icon'=>"warning",
                                'title'=>"Too many tries, code expires!",
                                "showConfirmButton"=>"true",
                                "timer"=>1000,
                                "link"=>"#"
                            ],
                        ], status: 302);
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
                'error'=>'Invalid',
            ], status: 302);
        }
    }
    function signup(Request $request){
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|max:255',
            'lastname' => 'required|max:255',
            'gender' => 'required|integer',
            'email' => 'required|email',
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // insert here 

        // session
        return redirect('/renter/profile');
    }
}
