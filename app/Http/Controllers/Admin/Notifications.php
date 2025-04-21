<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class Notifications extends Controller
{
    function index(){
        return Inertia("UserPages/Admin/Notification/Notification");
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
                'updated_at',
                DB::raw("CONCAT(creator.first_name, ' ', creator.last_name) as full_name"),
            )
            ->leftjoin('users as creator','creator.id','n.created_by')
            ->where('n.user_id', '=', 0)
            ->orderBy("n.created_at",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();
        

        $total = DB::table('notifications as n')
            ->where('n.user_id', '=', 0)
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
    public function toggle(Request $request){
        $id = $request->input(key: 'id');

        $detail = DB::table('notifications')
            ->where('id','=', $id)
            ->first();
        return DB::table('notifications')
            ->where('id', $id)
            ->update([
                'is_read'=>!$detail->is_read
            ]);
    }
}
