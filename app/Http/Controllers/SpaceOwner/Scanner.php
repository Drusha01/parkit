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
            $type = $segments[0];
            $hash = $segments[2];
        }

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
            ->join('users as u','u.id','v.user_id')
            ->join('status as st','st.id','v.status_id')
            ->join('licenses_v2 as l','l.user_id','u.id')
            ->where('l.is_approved','=',1)
            ->where('v.hash','=',$hash)
            ->where('st.name','=', 'Active')
            ->first();
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
        }else{
            return 'Invalid Vehicle QR Code';
        }

        if($vehicle && $space){
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
                    DB::raw('UNIX_TIMESTAMP(time_start) as time_start_unix_time'),
                    DB::raw('UNIX_TIMESTAMP(NOW()) as time_now_unix_time'),
                    'r.date_created' ,
                    'r.date_updated' ,
                    DB::raw('(NOW()) as time_now'),
                    DB::raw('(NOW() < (r.time_start + INTERVAL 30 SECOND)) as no_previous_data'),
                    DB::raw('(NOW() > (r.time_start + INTERVAL 30 SECOND)) as previous_data'),
                    DB::raw('(NOW() > (r.date_updated + INTERVAL 30 SECOND)) as update_previous_data'),
                )
                ->where('r.space_id','=',$space_id)
                ->where('r.vehicle_id','=',$vehicle->id)
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
                    DB::table('space_vehicle_alotments as sva')
                    ->where('sva.id','=',$space->space_vehicle_alotment_id)
                    ->update([
                        'current_vehicle_count' => DB::raw('current_vehicle_count - 1')
                    ]);

                  
                    // get comission
                    $commission = DB::table('comission as c')
                    ->first();

                    $space_vehicle_alotment = DB::table('space_vehicle_alotments as sva')
                        ->where('sva.id','=',$rent->space_vehicle_alotment_id)
                        ->first();
                    $update = [
                        'time_end' =>  DB::raw('NOW()'),
                    ];
                    // calculate amount
                    if($space_vehicle_alotment->rent_rate_type_id == 1){
                        // no time constraint OR FIXED
                        $update['amount'] = floatval($space_vehicle_alotment->rent_flat_rate) ;
                        $update['commission'] =floatval($update['amount'] * floatval($commission->percentage) );
                    }elseif($space_vehicle_alotment->rent_rate_type_id == 2){
                        // initial flat rate then applies per duration
                        $total_duration = $rent->time_now_unix_time - $rent->time_start_unix_time;
                        $flat_rate_duration = $space_vehicle_alotment->rent_flat_rate_duration;
                        $interval = $space_vehicle_alotment->rent_duration;

                        if($total_duration > $flat_rate_duration){
                            $total_duration  -=  $flat_rate_duration;
                            $duration_times =  ceil($total_duration / $interval);
                            $update['amount'] = floatval($space_vehicle_alotment->rent_duration_rate * $duration_times) ;
                            $update['commission'] =floatval($update['amount'] * floatval($commission->percentage) );
                        }else{
                            $update['amount'] = floatval($space_vehicle_alotment->rent_flat_rate) ;
                            $update['commission'] =floatval($update['amount'] * floatval($commission->percentage) );
                        }
                    }elseif($space_vehicle_alotment->rent_rate_type_id == 3){
                        // per duration
                        $total_duration = $rent->time_now_unix_time - $rent->time_start_unix_time;
                        $interval = $space_vehicle_alotment->rent_duration;
                        $duration_times =  ceil($total_duration / $interval);
                        $update['amount'] = floatval($space_vehicle_alotment->rent_duration_rate * $duration_times) ;
                        $update['commission'] =floatval($update['amount'] * floatval($commission->percentage) );
                    }
                    $rent->space_vehicle_alotment_id;
                    // update rent  (end)               -------------------------------- important
                    DB::table('rents as r')
                    ->where('r.id','=',$rent->id)
                    ->update($update);

                    // get wallet amount 
                    $wallet = DB::table('wallet_balances as w')
                        ->where('w.user_id','=',$vehicle->user_id)
                        ->first();
                    if($wallet){
                        if($wallet->amount > 0){
                            if($update['amount'] <= $wallet->amount){
                                DB::table('wallet_balances as w')
                                    ->where('w.user_id','=',$vehicle->user_id)
                                    ->update([
                                        'amount'=>DB::raw('amount - '.$update['amount'])
                                    ]);
                                if(
                                    DB::table('wallet_balances as w')
                                    ->where('w.user_id','=',$space->user_id)
                                    ->first()){
                                    DB::table('wallet_balances as w')
                                        ->where('w.user_id','=',$space->user_id)
                                        ->update([
                                            'amount'=>DB::raw('amount + '.floatval($update['amount'] - $update['commission']))
                                        ]);
                                }else{
                                    DB::table('wallet_balances')
                                        ->insert([
                                            'amount'=> floatval($update['amount'] - $update['commission']),
                                            'description'=>'',
                                            'user_id'=>$space->user_id
                                        ]);
                                }
                                DB::table('payment_logs')
                                    ->insert([
                                        'user_id'=> $vehicle->user_id,
                                        'rent_id' => $rent->id,
                                        'amount_paid' => $update['amount'],
                                        'commission'=>$update['commission'],
                                        'log_details'=> "Total of ".$update['amount'] .' was deducted to your wallet',
                                        'link' => null ,
                                ]);
                                $update['amount'] = 0;
                            }else{
                                DB::table('wallet_balances as w')
                                    ->where('w.user_id','=',$vehicle->user_id)
                                    ->update([
                                        'amount'=>0
                                    ]);
                                if(
                                    $space_owner_wallet = DB::table('wallet_balances as w')
                                    ->where('w.user_id','=',$space->user_id)
                                    ->first()){
                                    DB::table('wallet_balances as w')
                                        ->where('w.user_id','=',$space->user_id)
                                        ->update([
                                            'amount'=>DB::raw('amount + '.($wallet->amount >= $update['commission'] ? floatval($wallet->amount - $update['commission']): - $update['commission']))
                                        ]);
                                }else{
                                    DB::table('wallet_balances as w')
                                    ->insert([
                                        'amount'=> ($wallet->amount >= $update['commission'] ? floatval($wallet->amount - $update['commission']): - $update['commission']),
                                        'description'=>'',
                                        'user_id'=>$space->user_id
                                    ]);
                                }
                                DB::table('payment_logs')
                                ->insert([
                                    'user_id'=> $space->user_id,
                                    'rent_id' => $rent->id,
                                    'amount_paid' => $wallet->amount,
                                    'commission'=>$update['commission'],
                                    'log_details'=> "Total of ". ($wallet->amount - $update['commission']) .' was added to your wallet',
                                    'link' => null ,
                                ]);
                                DB::table('payment_logs')
                                ->insert([
                                    'user_id'=> $vehicle->user_id,
                                    'rent_id' => $rent->id,
                                    'amount_paid' => $wallet->amount,
                                    'commission'=>$update['commission'],
                                    'log_details'=> "Total of ".$wallet->amount .' was deducted to your wallet',
                                    'link' => null ,
                                ]);
                                $update['amount'] -= $wallet->amount;
                            }

                            // notification here
                        }
                    }
                    return 'Thank you, come again. Rent amount: '.($update['amount'] != 0 ? 'P'.$update['amount'] :'Paid via wallet' );
                }else{
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
                        return 'Success, Welcome back to parkIt';
                    }
                }
                
                if($rent->previous_data ){
                    return 'Successfully time-out, please try again time-in later';
                }else{
                    return 'Successfully time-in, please try again time-out later';
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
                return 'Success, Welcome to parkIt';
            }
        } 
        return response()->json(['message' => 'Errorasdf.'] , 422);
    }
}
