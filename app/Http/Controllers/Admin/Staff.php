<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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
                DB::raw("CONCAT(u.first_name, ' ',u.middle_name ,' ',u.last_name) as full_name"),
                'g.name as gender_name',
                'u.birthdate',
                'u.email',
                'u.email_verified',
                'u.is_active'

            )
            ->join('genders as g','u.gender_id','=','g.id')
            ->where('u.is_admin', '=',1)
            ->where(DB::raw("CONCAT(u.first_name, ' ',u.middle_name ,' ',u.last_name)"), 'like', "%{$search}%")
            ->orderBy("u.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('users as u')
            ->where('u.is_admin', '=',1)
            ->where(DB::raw("CONCAT(u.first_name, ' ',u.middle_name ,' ',u.last_name)"), 'like', "%{$search}%")
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
        $detail =  $data = DB::table('users as u')
            ->select(
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ',u.middle_name ,' ',u.last_name) as full_name"),
                'g.name as gender_name',
                'u.birthdate',
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
}
