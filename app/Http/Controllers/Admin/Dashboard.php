<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class Dashboard extends Controller
{
    public function index(Request $request){
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
            ->groupBy('vt.id')
            ->get()
            ->toArray();

        $revenue_on_previous_days = DB::table('rents as r')
            ->select(
               DB::raw('DATE_FORMAT(r.date_created, "%b %e, %y") as created_date'),
                DB::raw('SUM(commission) as total_amount')
            )
            ->join('spaces as s','r.space_id','s.id')
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
                DB::raw('SUM(commission) as total_amount')
            )
            ->join('spaces as s','r.space_id','s.id')
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
            SUM(r.commission) as total_amount
        ')
        ->groupByRaw('YEAR(r.date_created), MONTH(r.date_created)')
        ->orderBy('first_date', 'DESC')
        ->limit(10)
        ->get();

        $spaces = DB::table('spaces as s')
            ->select(
                DB::raw('count(*) as total'),
                'sn.id',
                'sn.name as status_name',
            )
            ->join('status as sn','sn.id','s.status')
            ->groupBy('sn.id')
            ->get()
            ->toArray();

        $vehicles = DB::table('vehicles_v2 as v')
            ->select(
                DB::raw('count(*) as total'),
                'sn.id',
                'sn.name as status_name',
            )
            ->join('status as sn','sn.id','v.status_id')
            ->join('users as u','u.id','v.user_id')
            ->groupBy('sn.id')
            ->get()
            ->toArray();

        return Inertia("UserPages/Admin/Dashboard/Dashboard",[
            'vehicle_types'=>$vehicle_types,
            'revenue_on_previous_days'=>$revenue_on_previous_days,
            'revenue_on_previous_days_per_space'=> $revenue_on_previous_days_per_space,
            'monthly_revenue'=>$monthly_revenue,
            'spaces'=>$spaces,
            'vehicles'=>$vehicles
        ]);
    }
}
