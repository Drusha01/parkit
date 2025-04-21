<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Licenses extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Licenses/Licenses",[
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
                'u.birthdate',
                'u.email',
                'u.email_verified',
                'u.is_active',
                'u.profile',
                'l.id',
                'l.user_id' ,
                'l.is_approved' ,
                'l.license_no' ,
                'l.picture_of_license' ,
                'l.picture_holding_license' ,           
                'l.date_created' ,
                'l.date_updated',
            )
            ->join('licenses_v2 as l','u.id','=','l.user_id')
            ->orWhere(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orWhere('license_no', 'like', "%{$search}%")
            ->orderBy("l.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();
        $total = DB::table('users as u')
            ->join('licenses_v2 as l','u.id','=','l.user_id')
            ->orWhere(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orWhere('license_no', 'like', "%{$search}%")
            ->orderBy("l.id",'desc')
            ->count(); 
        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200); 
    }

    public function view(Request $request,$id){
        $data = $request->session()->all();
        $detail = DB::table('users as u')
        ->select(
            'u.id',
            DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name"),
            'u.birthdate',
            'u.email',
            'u.email_verified',
            'u.is_active',
            'u.profile',
            'l.id',
            'l.user_id' ,
            'l.is_approved' ,
            'l.license_no' ,
            'l.picture_of_license' ,
            'l.picture_holding_license' ,           
            'l.date_created' ,
            'l.date_updated',
        )
        ->join('licenses_v2 as l','u.id','=','l.user_id')
            ->where('l.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }
    public function toggle_is_active(Request $request){
        $data = $request->session()->all();
        $id = $request->input(key: 'id');

        $detail = DB::table('licenses_v2')
            ->where('id','=', $id)
            ->first();
        $result = null;
        if(!DB::table('licenses_v2')
        ->where('license_no', $detail->license_no)
        ->where('is_approved', 1)
        ->where('id','<>', $id)
        ->first()){
            $result = DB::table('licenses_v2')
                ->where('id', $id)
                ->update([
                    'is_approved'=>!$detail->is_approved
                ]);
            DB::table('notifications')
                ->insert([
                    'user_id'=>$detail->user_id, // 0 to admin
                    'created_by'=>0,
                    'title' => 'License Update!',
                    'message'=> 'Admin has '.($detail->is_approved == 0? 'approved your' : 'disapproved your').' "'.$detail->license_no .'".'
                ]);
        }
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update vehicle type.'], status: 422);
    }
}
