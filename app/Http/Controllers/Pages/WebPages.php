<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WebPages extends Controller
{
    function homepage(Request $request){
        return Inertia::render("webPages/Home",[
        ]);
    }
    function browse(Request $request){
        return Inertia('webPages/Browse');
    }
    function howitworks(Request $request){
        return Inertia('webPages/HowItWorks');
    }
    function whyparkit(Request $request){
        return Inertia('webPages/WhyParkIt');
    }
    function aboutus(Request $request){
        return Inertia('webPages/AboutUs');
    }
    function driverfaq(Request $request){
        return Inertia('webPages/DriveFaq');
    }

    function privacypolicy(Request $request){
        return Inertia('webPages/PrivacyPolicy');
    }

    public function go(Request $request,$id){
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
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
            ->get()
            ->toArray();
        return Inertia('webPages/Go',[
            'detail' => $detail,
            'space_pictures'=>$space_pictures,
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types,
            'allotments'=>$allotments
        ]);
    }

    public function spaces(Request $request){
        $search = $request->input('search');
        $user_data = $request->session()->all();
        $vehicle_type_id = NULL;
        if(isset( $user_data['user_id'])){
            $vehicle_type_id = DB::table('users as u')
                ->select('v.vehicle_type_id')
                ->join('vehicles_v2 as v','v.id','=','u.default_vehicle_id')
                ->where('u.id','=',$user_data['user_id'])
                ->first()->vehicle_type_id;
        }
            // $data = DB::table('spaces as s')
            // ->select(
            //     DB::raw('DISTINCT(s.id)') ,
            //     's.user_id',
            //     's.status as status_id',
            //     'st.name as status_name',
            //     's.name',
            //     's.rules' ,
            //     's.description' ,
            //     's.location_long' ,
            //     's.location_lat' ,
            //     's.overall_rating' ,
            //     's.hash' ,
            //     's.date_created',
            //     's.date_updated',
            //     DB::raw('SUM(sva.vehicle_count'),
            //     DB::raw('SUM(sva.current_vehicle_count)'),
            //     // 'sva.vehicle_type_id'
            // )
            // ->join('status as st', 'st.id', '=', 's.status')
            // ->join('space_vehicle_alotments as sva','sva.space_id','s.id')
            // ->where('st.name','=','Active')
            // // ->where('sva.vehicle_type_id','=',$vehicle_type_id)
            // ->where(function ($query) use ($search) {
            //     if (!empty($search)) {
            //         $query->orWhere('s.name', 'like', "{$search}%");
            //     }
            // });

        $data = DB::table('spaces as s')
            ->select(
                DB::raw('DISTINCT(s.id)'),
                's.user_id',
                's.status as status_id',
                'st.name as status_name',
                's.name',
                's.rules',
                's.description',
                's.location_long',
                's.location_lat',
                's.overall_rating',
                's.hash',
                's.date_created',
                's.date_updated',
                DB::raw('SUM(sva.vehicle_count * vt.parking_unit) as vehicle_count '),
                DB::raw('SUM(sva.current_vehicle_count * vt.parking_unit) as current_vehicle_count')
            )
            ->join('status as st', 'st.id', '=', 's.status')
            ->join('space_vehicle_alotments as sva', 'sva.space_id', '=', 's.id')
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->where('st.name', '=', 'Active')
            ->where(function ($query) use ($search) {
                if (!empty($search)) {
                    $query->orWhere('s.name', 'like', "{$search}%");
                }
            })
            ->groupBy(
                's.id', 
                's.user_id', 
                's.status', 
                'st.name', 
                's.name', 
                's.rules', 
                's.description', 
                's.location_long', 
                's.location_lat', 
                's.overall_rating', 
                's.hash', 
                's.date_created', 
                's.date_updated'
            );
       
        if (!empty($status)) {
            $data->whereIn('s.status', $status); 
        }
        $data = $data->orderBy("s.id", 'desc')
        ->get()
        ->toArray();
        return response()->json([
            'data' => $data,
            'search'=>$search
        ], 200); 
    }

    function view_space(Request $request,$id){
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
}
