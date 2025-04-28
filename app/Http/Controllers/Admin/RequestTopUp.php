<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class RequestTopUp extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/RequestTopUp/RequestTopUp",[
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
        $data = DB::table('requests_topups as r')
            ->select(   
                'r.id' ,
                'r.user_id' ,
                'r.created_by',
                'r.amount' , 
                'r.reference_photo' ,
                'r.status' ,
                'r.remarks' ,
                'r.created_at',
                'r.updated_at',
                'r.remarks',
                DB::raw("CONCAT(re.first_name, ' ',re.middle_name ,' ',re.last_name) as full_name"),

            )
            ->join('users as re','re.id','r.user_id')
            ->orderBy("r.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('requests_topups as r')
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

    public function view(Request $request,$id){
        $user_data = $request->session()->all();
        $detail =  DB::table('requests_topups as r')
            ->select(   
                'r.id' ,
                'r.user_id' ,
                'r.created_by',
                'r.amount' , 
                'r.reference_photo' ,
                'r.status' ,
                'r.remarks' ,
                'r.created_at',
                'r.updated_at',
                'r.remarks',
                DB::raw("CONCAT(re.first_name, ' ',re.middle_name ,' ',re.last_name) as full_name"),
            )
            ->join('users as re','re.id','r.user_id')
            ->where('r.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }

    public function edit(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'amount'=>'required|numeric|min:0.01',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = [
            'amount' => $request->input('amount'),
            'status' => $request->input( 'status'),
            'remarks' => $request->input( 'remarks'),
        ];

        if($request->input( 'status') == 'Complete'){
            $data = $request->session()->all();
            $user = DB::table("users as u")
                ->select(
                    "id",
                    "email",
                    "is_space_owner",
                    "password",
                    'is_admin'
                    )
                ->where("id","=",$data['user_id'])
                ->first();
    
            if($user && password_verify($request->input("password"),$user->password)){
                $result =  null;
                $message = "";
                $type = "";
                if(
                    DB::table('wallet_balances as w')
                    ->where('w.user_id','=',$request->input('user_id'))
                    ->first()){
                    if($request->input('topup')){
                        $result = DB::table('wallet_balances as w')
                        ->where('w.user_id','=',$request->input('user_id'))
                            ->update([
                               'amount'=> DB::raw('amount + '.$request->input('amount')),
                            ]);
                        $type = "success";
                        $message = "Successfully top-up";
                    }else{
                        $result = DB::table('wallet_balances as w')
                        ->where('w.user_id','=',$request->input('user_id'))
                        ->where('w.amount','>=',$request->input('amount'))
                            ->update([
                               'amount'=> DB::raw('amount - '.$request->input('amount')),
                            ]);
                        if($result){
                            $type = "success";
                            $message = "Successfully deducted";
                        }else{
                            $type = "warning";
                            $message = "Void amount is greater than balance";
                        }
                    }
                }else{
                    if($request->input('topup')){
                        $result = DB::table('wallet_balances')
                        ->insert([
                            'amount'=> $request->input('amount'),
                            'description'=>'',
                            'user_id'=>$request->input('user_id')
                        ]);
                        $type = "success";
                        $message = "Successfully top-up";
                    }
                }
                DB::table('payment_logs')
                    ->insert([
                        'user_id'=> $request->input('user_id'),
                        'rent_id' => null,
                        'amount_paid' => $request->input('amount'),
                        'commission'=>0,
                        'log_details'=> "Admin has topup your wallet with amount of (" .number_format($request->input('amount'),2). ")",
                        'link' => null ,
                    ]);
            }
        }
        

        $result = 1; 
        DB::table('requests_topups')
            ->where('id', $request->input('id'))  
            ->update($updateData);
    
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update.'], 422);
    }
}
