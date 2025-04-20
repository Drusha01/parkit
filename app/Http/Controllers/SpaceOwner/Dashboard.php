<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{

    function index(Request $request ){
        $user_data = $request->session()->all();

        $vehicle_types = DB::table('rents as r')
            ->select(
                DB::raw('vt.id'),
                DB::raw('count(vt.id) as total'),
                DB::raw('vt.name'),
            )
            ->join('spaces as s','r.space_id','s.id')
            ->join('vehicles_v2 as v','r.vehicle_id','v.id')
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->where('s.user_id','=',$user_data['user_id'])
            ->groupBy('vt.id')
            ->get()
            ->toArray();

        $revenue_on_previous_days = DB::table('rents as r')
            ->select(
               DB::raw('DATE_FORMAT(r.date_created, "%b %e, %y") as created_date'),
                DB::raw('SUM(amount) as total_amount')
            )
            ->join('spaces as s','r.space_id','s.id')
            ->where('s.user_id','=',$user_data['user_id'])
            ->groupBy('created_date')
            ->orderBy('r.date_created','asc')
            ->limit(10)
            ->get()
            ->toArray();

        $revenue_on_previous_days_per_space = DB::table('rents as r')
            ->select(
               DB::raw('DATE_FORMAT(r.date_created, "%b %e, %y") as created_date'),
                'r.space_id',
                's.name as space_nane',
                DB::raw('SUM(amount) as total_amount')
            )
            ->join('spaces as s','r.space_id','s.id')
            ->where('s.user_id','=',$user_data['user_id'])
            ->groupBy('created_date','space_id')
            ->orderBy('r.date_created','asc')
            ->limit(10)
            ->get()
            ->toArray();


        $monthly_revenue  = DB::table('rents as r')
        ->join('spaces as s', 'r.space_id', '=', 's.id')
        ->selectRaw('
            DATE_FORMAT(r.date_created, "%M %Y") as month_year,
            MIN(r.date_created) as first_date,
            SUM(r.amount) as total_amount
        ')
        ->where('s.user_id', $user_data['user_id'])
        ->groupByRaw('YEAR(r.date_created), MONTH(r.date_created)')
        ->orderBy('first_date', 'DESC')
        ->limit(10)
        ->get();
    
        return Inertia("UserPages/SpaceOwner/Dashboard/Dashboard",[
            'dashboard'=>1,
            'vehicle_types'=>$vehicle_types,
            'revenue_on_previous_days'=>$revenue_on_previous_days,
            'revenue_on_previous_days_per_space'=> $revenue_on_previous_days_per_space,
            'monthly_revenue'=>$monthly_revenue
        ]);
    }
}
