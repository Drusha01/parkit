<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Spaces extends Controller
{
    public function index(Request $request){
        $status = DB::table("status")
        ->get()
        ->toArray();
        return Inertia("UserPages/Admin/Spaces/Spaces",[
            'status' => $status,
        ]);
    }

    public function all(Request $request){
        $user_data = $request->session()->all();
        $rows = $request->input('rows');
        $status = $request->input('filter')['statuses'];
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

        // id INT PRIMARY KEY AUTO_INCREMENT,
        // user_id INT NOT NULL,
        // is_approved BOOLEAN DEFAULT 0,
        // status INT DEFAULT 1,
        // name VARCHAR(255) NOT NULL,
        // rules VARCHAR(512) NOT NULL,
        // description VARCHAR(1024) NOT NULL,
        // location_long DOUBLE NOT NULL,
        // location_lat DOUBLE NOT NULL,
        // overall_rating DOUBLE,
        // hash VARCHAR(32) UNIQUE DEFAULT (MD5(CONCAT(name,NOW())))  ,
        // date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
        // date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        $data = DB::table('spaces as s')
        ->select(
            's.id' ,
            's.user_id',
            's.is_approved' ,
            's.status as status_id',
            'st.name as status_name',
            's.name',
            's.rules' ,
            's.description' ,
            's.location_long' ,
            's.location_lat' ,
            's.overall_rating' ,
            's.hash' ,
            's.date_created',
            's.date_updated',
            DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name")
        )
        ->join('status as st', 'st.id', '=', 's.status')
        ->join('users as u', 'u.id', '=', 's.user_id')
        ->where(function ($query) use ($search) {
            if (!empty($search)) {
                $query->where(DB::raw("CONCAT(u.first_name, ' ', u.last_name)"), 'like', "{$search}%")
                    ->orWhere('s.name', 'like', "{$search}%");
            }
        });

        if (!empty($status)) {
            $data->whereIn('s.status', $status); 
        }

        $data = $data->orderBy("s.id", 'desc')
            ->offset(($page - 1) * $rows)
            ->limit($rows)
            ->get()
            ->toArray();

        $total = DB::table('spaces as s')
            ->join('status as st','st.id','s.status')
            ->join('users as u','u.id','s.user_id')
            ->orWhere(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orWhere('s.name', 'like', "{$search}%")
            ->orderBy("s.id",'desc')
            ->count(); 
        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200); 
    }
    function view(Request $request,$id){
        $data = $request->session()->all();
        $detail  = DB::table('spaces as s')
            ->select(
                's.id',
                's.user_id' ,
                's.is_approved' ,
                's.status' ,
                's.name',
                's.rules' ,
                's.description',
                's.location_long' ,
                's.location_lat',
                's.overall_rating' ,
                's.hash' ,
                's.date_created' ,
                's.date_updated' ,
                'st.name as status_name'
            )
            ->join("status as st",'s.status','=','st.id')
            ->where('s.id', $id)
            ->first();

        $space_pictures = DB::table("space_pictures")
            ->where("space_id",'=',$id)
            ->get()
            ->toArray();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $allotments = DB::table('space_vehicle_alotments as sva')
            ->select(
                "sva.id",
                "space_id",
                "vehicle_type_id",
                "vehicle_count",
                "rent_rate_type_id",
                "rent_duration",
                "rent_duration_rate",
                "rent_flat_rate_duration",
                "rent_flat_rate",
                "sva.date_created",
                "sva.date_updated",
                "vt.type as vehicle_type",
                "vt.name as vehicle_name",
                "vt.description as vehicle_description",
                "vt.icon as vehicle_icon",
                "rrt.name as rent_rate_name",
            )
            ->where("space_id",'=',$id)
            ->where("sva.is_active",'=',1)
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
            ->get()
            ->toArray();
        return response()->json([
            'detail' => json_encode($detail),
            'space_pictures'=>json_encode($space_pictures),
            'vehicle_types'=> json_encode($vehicle_types),
            'rent_rate_types'=> json_encode($rent_rate_types),
            'allotments'=>json_encode($allotments)
        ], 200);
    }

    public function modify_status(Request $request){
        $data = $request->session()->all();
        $id = $request->input(key: 'id');
        $status_id = $request->input(key: 'status_id');

        $detail = DB::table('spaces')
            ->where('id','=', $id)
            ->first();
        $result = null;
        if(!DB::table('spaces')
        ->where('name', '=',$detail->name)
        ->where('id','<>', $id)
        ->first()){
            $result = DB::table('spaces')
                ->where('id', $id)
                ->update([
                    'status'=>$status_id
                ]);
        }
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update space status.'], status: 422);
    }
}
