<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\DB;
use Mail;
class OAuthController extends Controller
{
    public $email = null; 
    public $this =null; 
    function google(Request $request){
        $user_data = Socialite::driver('google')->user();
        $data = $request->session()->all();

        $user = DB::table("users as u")
            ->select(
                "u.id",
                "u.email",
                "u.is_space_owner",
                'is_active'
            )
            ->where("u.email","=", $user_data->email)
            ->where("u.email_verified","=", 1)
            ->first();
        if($user->is_active ==0){
            return response()->json([
                "errors"=> [
                    "Invalid"=>["Account deactivated!"]
                ],
            ], status: 422);
        }
        if($user){
            $request->session()->invalidate();
            $request->session()->put( 'user_id', $user->id);
            $request->session()->put( 'renter', true);
        }else{
            DB::table("users")->
            insert([
                'id' => NULL,
                'user_login_type_id'=> 1,
                'gender_id' => NULL,
                'google_oauth_id' => NULL,
                'facebook_oauth_id' => NULL,
                'username' => NULL,
                'password' => NULL ,
                'is_admin' => NULL,
                'is_space_owner' => NULL,
                'first_name' => $user_data->user['given_name'], 
                'middle_name' => NULL,
                'last_name' => $user_data->user['family_name'],
                'suffix' =>NULL,
                'email' =>  $user_data->user['email'],
                'email_verified' => true,
                'mobile_number' =>NULL,
                'mobile_number_verified' =>NULL, 
            ]);
            $user = DB::table("users")
            ->select([
                "id",
                "email",
                "is_space_owner"])
            ->where("email","=",$user_data->user['email'])
            ->first();
            $this->email = $user_data->user['email'];
            $this->full_name = $user_data->user['given_name'] .' '.$user_data->user['family_name'];
            Mail::send('mail.welcome', [
                'fullname'=> $user_data->user['given_name'],
                'email'=>$this->email], 
                function($message) {
                $message->to($this->email, $this->email)->subject
                ('Account Registration');
                $message->from('Parkakiofficial@gmail.com','ParkIt');
            });
            $request->session()->invalidate();
            $request->session()->put( 'user_id', $user->id);
            $request->session()->put( 'renter', true);
        }
        if($data['path'] == 'renter'){
            return to_route('renter.profile.index');
        }else{
            return to_route('spaceowner.dashboard.index');
        }

    }
}
