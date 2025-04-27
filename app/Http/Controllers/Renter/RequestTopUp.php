<?php

namespace App\Http\Controllers\Renter;

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
        return Inertia("UserPages/Renter/RequestTopUp/RequestTopUp",[
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
                'r.remarks'
            )
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
    function store_image($file_input,$folder){
        return basename($file_input->store($folder)); 
    }

    public function add(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'amount'=>'required|numeric|min:0.01',
            'reference_photo' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::table('requests_topups')
        ->insert([
            'user_id'=>$data['user_id'],
            'amount' => $request->input('amount'),
            'reference_photo' => self::store_image($request->file('reference_photo'),'reference_photo'),
        ]);
        DB::table('notifications')
        ->insert([
            'user_id'=>0, // 0 to admin
            'created_by'=>$data['user_id'],
            'title' => 'New Top up',
            'message'=> 'has created a new top up with amount of '.$request->input('amount')
        ]);
        return 1;
    }

    public function view(Request $request,$id){
        $user_data = $request->session()->all();
        $data = $request->session()->all();
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
                'r.remarks'
            )
            ->where('r.user_id','=',$user_data['user_id'])
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
        ];
        
        if ($request->hasFile('reference_photo')) {
            $updateData['reference_photo'] = self::store_image($request->file('reference_photo'), 'reference_photo'); 
        }

        $result = 1; 
        DB::table('requests_topups')
            ->where('id', $request->input('id'))  
            ->where('user_id', $data['user_id'])  
            ->update($updateData);
    
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update.'], 422);
    }

    public function delete(Request $request){
        $data = $request->session()->all();
        $id = $request->input('id');

        $result = DB::table('requests_topups')
        ->where('id', $request->input('id'))  
        ->where('user_id', $data['user_id'])  
        ->delete();
    
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to delete top up.'], 500);
    }
}
