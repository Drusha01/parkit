<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Commission extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Commission/Commission",[
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

        #	Ref#	Vehicle	Parking Space	Location	Time	Fee
        $data = DB::table('rents as r')
            ->select(
                'r.id' ,
                'r.user_id' ,
                'r.space_vehicle_alotment_id',
                'r.time_start',
                'r.time_end',
                'r.commission',
                'r.rate_rate',
                'r.rate_type',
                'r.amount',
                'r.vehicle_id',
                'v.brand',
                'v.unit',
                'v.cr_file_number',
                'v.cr_plate_number' ,
                'v.vehicle_type_id' ,
                'vt.type as vehicle_type',
                'vt.name as vehicle_type_name',
                's.id as space_id',
                's.name as space_name',
                's.rules' ,
                's.description' ,
                's.location_long' ,
                's.location_lat' ,
                's.overall_rating' ,
                'r.date_created' ,
                'r.date_updated' ,
                'rg.rate',
                'rg.remarks'

            )
            ->join('vehicles_v2 as v','v.id','r.vehicle_id')
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('spaces as s','s.id','r.space_id')
            ->leftjoin('ratings as rg','rg.rent_id','r.id')
            ->whereNotNull('r.time_end')
            ->where('v.cr_plate_number', 'like', "%{$search}%")
            ->where('v.cr_file_number', 'like', "%{$search}%")
            ->where('s.name', 'like', "%{$search}%")
            ->orderBy("r.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('rents as r')
            ->join('vehicles_v2 as v','v.id','r.vehicle_id')
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('spaces as s','s.id','r.space_id')
            ->where('s.user_id','=',$user_data['user_id'])
            ->whereNotNull('r.time_end')
            ->where('v.cr_plate_number', 'like', "%{$search}%")
            ->where('v.cr_file_number', 'like', "%{$search}%")
            ->where('s.name', 'like', "%{$search}%")
            ->orderBy("r.id",'desc')
            ->count(); 
        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200);
    }
}
