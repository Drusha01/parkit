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

    public function go(Request $request){
        return Inertia('webPages/Go');
    }

    public function spaces(Request $request){
        $search = $request->input('search');
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
        )
        ->join('status as st', 'st.id', '=', 's.status')
        ->where('st.name','=','Active')
        ->where(function ($query) use ($search) {
            if (!empty($search)) {
                $query->orWhere('s.name', 'like', "{$search}%");
            }
        });

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
}
