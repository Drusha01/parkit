<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Notification extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/Notification/Notification");
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
        $data = DB::table('notifications as n')
            ->select(
                'n.id',
                'user_id',
                'created_by',
                'title',
                'message',
                'is_read',
                'created_at',
                'updated_at'

            )
            ->leftjoin('users as creator','creator.id','n.created_by')
            ->where('n.user_id', '=', $user_data['user_id'])
            ->orderBy("n.created_at",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();
        

        $total = DB::table('notifications as n')
            ->where('n.user_id', '=', $user_data['user_id'])
            ->orderBy("created_at",'desc')
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
