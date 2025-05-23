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
            'v.brand',
            'v.unit',
            'v.vehicle_type_id',
            'vt.name as vehicle_type_name',
            'vt.type as vehicle_type',
            'v.cor_picture',
            'v.cor_holding_picture',
            'v.left_side_picture',
            'v.right_side_picture',
            'v.back_side_picture',
            'v.front_side_picture',
            's.name as status_name',
            's.id as status_id',
            'v.date_created',
            'v.date_updated',
            'u.id as user_id',
            DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name")
        )
        ->join('vehicle_types as vt', 'vt.id', '=', 'v.vehicle_type_id')
        ->join('status as s', 's.id', '=', 'v.status_id')
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
                'v.brand',
                'v.unit',
                'v.vehicle_type_id' ,
                'vt.name as vehicle_type_name',
                'vt.type as vehicle_type',
                'v.cor_picture' ,
                'v.cor_holding_picture' ,
                'v.left_side_picture' ,
                'v.right_side_picture' ,
                's.name as status_name',
                's.id as status_id',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.date_created' ,
                'v.date_updated' ,
                DB::raw("CONCAT(u.first_name,' ',u.last_name) as full_name"),
                )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as s','s.id','v.status_id')
            ->join('users as u','u.id','v.user_id')
            ->where('v.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }
    public function modify_status(Request $request){
        $data = $request->session()->all();
        $id = $request->input(key: 'id');
        $status_id = $request->input(key: 'status_id');

        $detail = DB::table('vehicles_v2')
            ->where('id','=', $id)
            ->first();
        $result = null;
        $input = [
            'cr_file_number' =>$detail->cr_file_number,
            'cr_plate_number' => $detail->cr_plate_number,
        ];
        $validator = Validator::make($input, [
            'cr_plate_number' => [
                'required',
                Rule::unique('vehicles_v2')
                    ->where('cr_plate_number', $detail->cr_plate_number)
                    ->ignore($id),
            ],
            'cr_file_number' => [
                'required',
                Rule::unique('vehicles_v2')
                    ->where('cr_file_number', $detail->cr_file_number)
                    ->ignore($id),
            ],
        ], [
            'cr_plate_number.required' => 'The plate number is required.',
            'cr_plate_number.unique' => 'This plate number is already in use.',
            'cr_file_number.required' => 'The MV file number is required.',
            'cr_file_number.unique' => 'This MV file number is already in use.',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        if(!DB::table('vehicles_v2')
        ->where('cr_file_number', '=',$detail->cr_file_number)
        ->where('cr_plate_number', '=',$detail->cr_plate_number)
        ->where('id','<>', $id)
        ->first()){
            $result = DB::table('vehicles_v2')
                ->where('id', $id)
                ->update([
                    'status_id'=>$status_id
                ]);

            $status = DB::table('status')
                ->where('id','=',$status_id)
                ->first();

            DB::table('notifications')
                ->insert([
                    'user_id'=>$detail->user_id, // 0 to admin
                    'created_by'=>0,
                    'title' => 'Vehicle Update!',
                    'message'=> 'Admin has updated your vehicle "'.$detail->cr_file_number.'" status to "'.$status->name.'".'
                ]);
        }
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update vehicle type.'], status: 422);
    }
}
