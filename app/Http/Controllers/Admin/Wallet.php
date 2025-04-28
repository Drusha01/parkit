<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

class Wallet extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Wallet/Wallet",[
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
        $data = DB::table('users as u')
            ->select(
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name"),
                'g.name as gender_name',
                'u.birthdate',
                'u.email',
                'u.email_verified',
                'u.is_active',
                'u.profile',
                'wb.description',
                'wb.amount',
            )
            ->leftjoin('genders as g','u.gender_id','=','g.id')
            ->leftjoin('wallet_balances as wb','u.id','=','wb.user_id')
            ->where('u.is_admin', null)
            ->where(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orderBy("u.id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('users as u')
            ->where('u.is_admin', null)
            ->where(DB::raw("CONCAT(u.first_name,' ',u.last_name)"), 'like', "{$search}%")
            ->orderBy("id",'desc')  
            ->count(); 
        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search
        ], 200); 
    }
    public function view(Request $request, $id){
        $data = $request->session()->all();
        $detail =  DB::table('users as u')
            ->select(
                'u.id',
                DB::raw("CONCAT(u.first_name, ' ', u.last_name) as full_name"),
                'g.name as gender_name',
                'u.birthdate',
                'u.email',
                'u.email_verified',
                'u.is_active',
                'u.profile',
                'wb.description',
                'wb.amount',
            )
            ->leftjoin('genders as g','u.gender_id','=','g.id')
            ->leftjoin('wallet_balances as wb','u.id','=','wb.user_id')
            ->where('u.is_admin', null)
            ->where('u.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }

    public function topup(Request $request){
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
                           'amount'=> DB::raw('amount + '.$request->input('balance')),
                        ]);
                    $type = "success";
                    $message = "Successfully top-up";
                }else{
                    $result = DB::table('wallet_balances as w')
                    ->where('w.user_id','=',$request->input('user_id'))
                    ->where('w.amount','>=',$request->input('balance'))
                        ->update([
                           'amount'=> DB::raw('amount - '.$request->input('balance')),
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
                        'amount' => $request->input('balance'),
                        'description' =>'First top up',
                        'user_id' =>$request->input('user_id'),
                    ]);
                    $type = "success";
                    $message = "Successfully top-up";
                }
            }
            DB::table('payment_logs')
                ->insert([
                    'user_id'=> $request->input('user_id'),
                    'rent_id' => null,
                    'amount_paid' => $request->input('balance'),
                    'commission'=>0,
                    'log_details'=> "Admin has topup your wallet with amount of (" .number_format($request->input('balance'),2). ")",
                    'link' => null ,
                ]);
            return response()->json(['type'=>$type,'message' => $message]);
        }
        return 0;
    }
}
