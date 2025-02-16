<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Wallet extends Controller
{
    function index(Request $request){
        $data = $request->session()->all();
        $wallet_balances = DB::table('wallet_balances') 
            ->where('user_id','=',$data['user_id'])
            ->first();
        return Inertia("UserPages/Renter/MyWallet/MyWallet",[
            'wallet_balances'=>$wallet_balances
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
        $data = DB::table('payment_logs as pl')
            ->select(
                'pl.id',
                'pl.user_id',
                'pl.amount_paid',
                'pl.commission',
                'pl.log_details',
                'pl.date_created',
                'pl.date_updated',
                'r.id as rent_id',
                'r.space_id'
            )
            ->leftjoin('rents as r','pl.rent_id','r.id')
            ->where('pl.user_id','=',$user_data['user_id'])
            ->orderBy("r.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total =DB::table('payment_logs as pl')
            ->select(
                'pl.id',
                'pl.user_id',
                'pl.amount_paid',
                'pl.commission',
                'pl.log_details',
                'pl.date_created',
                'pl.date_updated',
                'r.id as rent_id',
            )
            ->leftjoin('rents as r','pl.rent_id','r.id')
            ->where('pl.user_id','=',$user_data['user_id'])
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
