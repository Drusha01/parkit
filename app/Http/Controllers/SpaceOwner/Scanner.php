<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Scanner extends Controller
{
    public function index(Request $request){
        $data = $request->session()->all();

        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        
        return Inertia("UserPages/SpaceOwner/Scan/Scan",[
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types
        ]);
    }

    public function scan(Request $request ){
        $data = $request->session()->all();
        $url = $request->input('url');
        $space_id = $request->input('space_id');
        $parsed = parse_url($url, PHP_URL_PATH); 
        $segments = explode('/', trim($parsed, '/'));
        $hash = null;
        if ($segments[0] === 'vehicle' && $segments[1] === 'qr') {
            $type = $segments[0]; // "vehicle"
            $hash = $segments[2]; // "6ab26531f2c48e9923ee83435dad7ff0"
        }

        // check vehicle and license if active
        $vehicle = DB::table("vehicles_v2 as v")
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
                'st.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            // ->join('users as u','u.default_vehicle_id','v.id')
            ->join('users as u','u.id','v.user_id')
            ->join('status as st','st.id','v.status_id')
            ->join('licenses_v2 as l','l.user_id','u.id')
            ->where('l.is_approved','=',1)
            ->where('v.hash','=',$hash)
            ->where('st.name','=', 'Active')
            ->first();

        // check space if active
        $space = [];
        if( $vehicle){
            $space = DB::table('spaces as s')
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
                    'st.name as status_name',
                    'sva.id as space_vehicle_alotment_id',
                    'sva.vehicle_type_id' ,
                    'sva.vehicle_count' ,
                    'sva.current_vehicle_count' ,
                    'sva.rent_rate_type_id' ,
                    'sva.rent_duration',
                    'sva.rent_duration_rate' ,
                    'sva.rent_flat_rate_duration' , 
                    'sva.rent_flat_rate',
                )
                ->join("status as st",'s.status','=','st.id')
                ->join("space_vehicle_alotments as sva",'sva.space_id','=','s.id')
                ->where('st.name','=', 'Active')
                ->where('s.user_id', $data['user_id']) 
                ->where('s.id', $space_id) 
                ->where('sva.vehicle_type_id', $vehicle->vehicle_type_id) 
                ->first();
        }

        if($vehicle && $space){
            // check if we already rent today and within 1 minute
            $rent = DB::table("rents as r")
                ->select(
                    'r.id' ,
                    'r.user_id' ,
                    'r.vehicle_id' ,
                    'r.space_id' ,
                    'r.space_vehicle_alotment_id' ,
                    'r.time_start' ,
                    'r.time_end' ,
                    'r.commission' ,
                    'r.rate_rate' ,
                    'r.rate_type' ,
                    'r.amount' ,
                    'r.date_created' ,
                    'r.date_updated' ,
                    DB::raw('(NOW()) as time_now'),
                    DB::raw('(NOW() < (r.time_start + INTERVAL 1 MINUTE)) as no_previous_data'),
                    DB::raw('(NOW() > (r.time_start + INTERVAL 1 MINUTE)) as previous_data'),
                    DB::raw('(NOW() > (r.date_updated + INTERVAL 1 MINUTE)) as update_previous_data'),
                )
                ->where('r.space_id','=',$space_id)
                ->where('r.vehicle_id','=',$vehicle->id)
                // ->whereRaw('NOW() > (r.time_start + INTERVAL 1 MINUTE)')
                ->orderBy('r.id','desc')
                ->first();
            $insert = [
                'id' => null,
                'user_id' => $data['user_id'],
                'vehicle_id' =>$vehicle->id,
                'space_id' =>$space_id,
                'space_vehicle_alotment_id' => $space->space_vehicle_alotment_id,
                'commission'  => 0, // to be filled later in percentage
                'rate_rate'  => 0,
                'rate_type'  => $space->rent_rate_type_id,
                'amount'  => 0,
            ];
            if($rent){
                if($rent->previous_data && $rent->time_end == null){
                    // update space allotment> current_vehicle_count (minus)
                    DB::table('space_vehicle_alotments as sva')
                    ->where('sva.id','=',$space->space_vehicle_alotment_id)
                    ->update([
                        'current_vehicle_count' => DB::raw('current_vehicle_count - 1')
                    ]);

                    // update rent  (end)               -------------------------------- important
                    DB::table('rents as r')
                    ->where('r.id','=',$rent->id)
                    ->update([
                        'time_end' =>  DB::raw('NOW()')
                    ]);
                    return response()->json(['message' => 'Thank you, come again'] , 200);
                }else{
                    // update space allotment > current_vehicle_count (plus)
                    // insert
                    $result = null;
                    if($rent->no_previous_data == 0 && $rent->update_previous_data && $rent->time_end != null)
                    $result = DB::table('rents')
                    ->insert($insert);
                    if($result){
                        DB::table('space_vehicle_alotments as sva')
                            ->where('sva.id','=',$space->space_vehicle_alotment_id)
                            ->update([
                                'current_vehicle_count' => DB::raw('current_vehicle_count + 1')
                            ]);
                    }
                    if($result){
                        return response()->json(['message' => 'Success, Welcome back to parkIt'] , 200);
                    }
                }
            }else{
                $result = DB::table('rents')
                ->insert($insert);
                if($result){
                    DB::table('space_vehicle_alotments as sva')
                        ->where('sva.id','=',$space->space_vehicle_alotment_id)
                        ->update([
                            'current_vehicle_count' => DB::raw('current_vehicle_count + 1')
                        ]);
                }
                return response()->json(['message' => 'Success, Welcome to parkIt'] , 200);
            }
        } 
        return response()->json(['message' => 'Error.'] , 422);
    }
}
