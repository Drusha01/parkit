<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rule;

class Staff extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Staff/Staff",[
        ]);
    }

    public function all(Request $request){
        $user_data = $request->session()->all();
        $rows = $request->input('rows');
        $search = $request->input('search');
        $page = $request->input('page');
        if(!isset($page)){
            $page = 1;
        }
        if( $page<=0){
            $page = 1;
        }
        if($rows > 100){
            $rows = 100;
        }
        $data = DB::table('users as u')
            ->select(
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name"),
                'g.name as gender_name',
                'g.id as gender',
                'u.birthdate',
                'u.first_name',
                'u.middle_name',
                'u.last_name',
                'u.suffix',
                'u.email',
                'u.email_verified',
                'u.is_active',
                'u.profile',

            )
            ->leftjoin('genders as g','u.gender_id','=','g.id')
            ->where('u.is_admin', '=',1)
            ->where(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orderBy("u.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('users as u')
            ->where('u.is_admin', '=',1)
            ->where(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orderBy("id",'desc')  
            ->count(); 
        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200); 
    }
    public function view(Request $request, $id){
        $data = $request->session()->all();
        $detail = DB::table('users as u')
            ->select(
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ',u.middle_name ,' ',u.last_name) as full_name"),
                'g.name as gender_name',
                'u.birthdate',
                'g.id as gender',
                'u.birthdate',
                'u.first_name',
                'u.middle_name',
                'u.last_name',
                'u.suffix',
                'u.email',
                'u.email_verified',

            )
            ->join('genders as g','u.gender_id','=','g.id')
            ->where('u.is_admin', '=',1)
            ->where('u.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }
    public function toggle_is_active(Request $request){
        $data = $request->session()->all();
        $id = $request->input(key: 'id');

        $detail = DB::table('users')
            ->where('id', $id)
            ->first();
        $result = DB::table('users')
            ->where('id', $id)
            ->update([
                'is_active'=>!$detail->is_active
            ]);
        return $result;
    }

    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'gender' => 'required|integer',
            'email' => 'required|email|unique:users',
            'birthdate'=> 'required|date|date_format:Y-m-d|before:'.now()->subYears(18)->toDateString(),
            'password' => ['required',Password::min(8),Password::min(8)->letters(),Password::min(8)->mixedCase(),Password::min(8)->numbers(),Password::min(8)->symbols()],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $result = DB::table("users")->insert([
            'id' => NULL,
            'user_login_type_id'=> 1,
            'gender_id' => $request->input("gender"),
            'google_oauth_id' => NULL,
            'facebook_oauth_id' => NULL,
            'username' => NULL,
            'password' => password_hash($request->input("password"), PASSWORD_ARGON2I) ,
            'is_admin' => 1,
            'is_space_owner' => NULL,
            'first_name' => $request->input("first_name"), 
            'middle_name' => $request->input("middle_name"),
            'last_name' => $request->input("last_name"),
            'suffix' => $request->input("suffix"),
            'email' => $request->input("email"),
            'birthdate' => $request->input("birthdate"),    
            'email_verified' => true,
            'mobile_number' =>NULL,
            'mobile_number_verified' =>NULL, 
        ]);
        return $result;
    }
    public function edit(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'gender' => 'required|integer',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($request->input("id")),
            ],
            'birthdate' => [
                'required',
                'date',
                'date_format:Y-m-d',
                'before:' . now()->subYears(18)->toDateString(),
            ],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $result = DB::table("users")
            ->where('id','=',$request->input("id"))
            ->update([
            'gender_id' => $request->input("gender"),
            'first_name' => $request->input("first_name"), 
            'middle_name' => $request->input("middle_name"),
            'last_name' => $request->input("last_name"),
            'suffix' => $request->input("suffix"),
            'email' => $request->input("email"),
            'birthdate' => $request->input("birthdate"),    
        ]);
        return $result;
    }
}
