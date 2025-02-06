<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
class Scanner extends Controller
{
    function index(Request $request){
        $user_data = $request->session()->all();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        $vehicles = DB::table('vehicles_v2 as v')
            ->select(
                'v.id' ,
                'v.user_id' ,
                'v.is_approved' ,
                'v.brand',
                'v.unit',
                'v.cr_file_number',
                'v.cr_plate_number' ,
                'v.vehicle_type_id' ,
                'vt.type as vehicle_type',
                'vt.name as vehicle_type_name',
                'v.cor_picture' ,
                'v.cor_holding_picture' ,
                'v.left_side_picture' ,
                'v.right_side_picture' ,
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->where('user_id','=',$user_data['user_id'])
            ->where('t.name','=','Active')
            ->get()
            ->toArray();
        return Inertia("UserPages/Renter/Scan/Scan",[
            'vehicle_types'=>$vehicle_types,
            'vehicles'=>$vehicles
        ]);
    }
}
