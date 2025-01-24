<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class VehicleTypes extends Controller
{
    function store_image($file_input,$folder){
        return basename($file_input->store($folder)); 
    }
    public function index(Request $request){
        return Inertia("UserPages/Admin/VehicleTypes/VehicleTypes",[
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
        $data = DB::table('vehicle_types')
            ->where('name', 'like', "%{$search}%")
            ->orderBy("id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('vehicle_types')
            ->where('name', 'like', "%{$search}%")
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

    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'type'         => 'required|string|max:255|unique:vehicle_types,type', 
            'name'         => 'required|string|max:255|unique:vehicle_types,name', 
            'description'  => 'nullable|string|max:512',
            'icon'         => 'required|file|mimes:jpg,jpeg,png,svg|max:2048',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $result = DB::table('vehicle_types')->insert([
            'type'         => $request->input('type'),
            'name'         => $request->input('name'),
            'description'  => $request->input('description'),
            'icon'         => self::store_image($request->file('icon'),'vehicle-types'),  // Save file path to DB
            'date_created' => now(),
            'date_updated' => now(),
        ]);
        
        return $result;
    }
    public function view(Request $request, $id) {
        $data = $request->session()->all();
        $detail = DB::table('vehicle_types')
            ->where('id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }

    public function toggle_is_active(Request $request){
        $data = $request->session()->all();
        $id = $request->input(key: 'id');

        $detail = DB::table('vehicle_types')
            ->where('id', $id)
            ->first();
        $result = DB::table('vehicle_types')
            ->where('id', $id)
            ->update([
                'is_active'=>!$detail->is_active
            ]);
        return $result;
    }

    public function edit (Request $request){
        $validator = Validator::make($request->all(), [
            'type'         => 'required|string|max:255|unique:vehicle_types,type,' . $request->input('id'), 
            'name'         => 'required|string|max:255|unique:vehicle_types,name,' . $request->input('id'), 
            'description'  => 'nullable|string|max:512',
            'icon'         => 'nullable|file|mimes:jpg,jpeg,png,svg|max:2048', // Icon is optional for update
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        
        $updateData = [
            'type'         => $request->input('type'),
            'name'         => $request->input('name'),
            'description'  => $request->input('description'),
            'date_updated' => now(),
        ];
        
        if ($request->hasFile('icon')) {
            $updateData['icon'] = self::store_image($request->file('icon'), 'vehicle-types'); 
        }
        
        $result = DB::table('vehicle_types')
            ->where('id', $request->input('id'))  
            ->update($updateData);
        
        return $result ? response()->json(['message' => 'Vehicle type updated successfully.']) : response()->json(['error' => 'Failed to update vehicle type.'], 500);
        
    }
}
