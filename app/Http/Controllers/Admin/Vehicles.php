<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Vehicles extends Controller
{
    public function index(Request $request){
        $status = DB::table("status")
        ->get()
        ->toArray();
        return Inertia("UserPages/Admin/Vehicles/Vehicles",[
            'status'=>$status
        ]);
    }
    public function all(Request $request){
        $user_data = $request->session()->all();
        $rows = $request->input('rows');
        $status = $request->input('filter')['statuses'];
        // dd($status);
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
        $data = DB::table('vehicles_v2 as v')
        ->select(
            'v.id',
            'v.user_id',
            'v.is_approved',
            'v.cr_file_number',
            'v.cr_plate_number',
            'v.vehicle_type_id',
            'vt.name as vehicle_type_name',
            'v.cor_picture',
            'v.cor_holding_picture',
            'v.left_side_picture',
            'v.right_side_picture',
            't.name as status_name',
            'v.back_side_picture',
            'v.front_side_picture',
            'v.date_created',
            'v.date_updated',
            'u.id',
            DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name")
        )
        ->join('vehicle_types as vt', 'vt.id', '=', 'v.vehicle_type_id')
        ->join('status as t', 't.id', '=', 'v.status_id')
        ->join('users as u', 'u.id', '=', 'v.user_id')
        ->where(function ($query) use ($search) {
            if (!empty($search)) {
                $query->where(DB::raw("CONCAT(u.first_name, ' ', u.last_name)"), 'like', "{$search}%")
                    ->orWhere('v.cr_file_number', 'like', "{$search}%")
                    ->orWhere('v.cr_plate_number', 'like', "{$search}%");
            }
        });

        if (!empty($status)) {
            $data->whereIn('v.status_id', $status); 
        }

        $data = $data->orderBy("v.id", 'desc')
            ->offset(($page - 1) * $rows)
            ->limit($rows)
            ->get()
            ->toArray();

        $total = DB::table('vehicles_v2 as v')
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->join('users as u','u.id','v.user_id')
            ->orWhere(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orWhere('cr_file_number', 'like', "{$search}%")
            ->orWhere('cr_plate_number', 'like', "{$search}%")
            ->orderBy("v.id",'desc')
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
        $detail = DB::table('vehicles_v2 as v')
            ->select(
                'v.id' ,
                'v.user_id' ,
                'v.is_approved' ,
                'v.cr_file_number',
                'v.cr_plate_number' ,
                'v.vehicle_type_id' ,
                'vt.name as vehicle_type_name',
                'v.cor_picture' ,
                'v.cor_holding_picture' ,
                'v.left_side_picture' ,
                'v.right_side_picture' ,
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.date_created' ,
                'v.date_updated' ,
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name"),
                )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->join('users as u','u.id','v.user_id')
            ->where('v.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }
}
