<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;
use chillerlan\QRCode\{QRCode, QROptions};

use function PHPUnit\Framework\fileExists;

class Vehicles extends Controller
{
    function index(Request $request){
        $data = $request->session()->all();
        $vehicle_types = DB::table("vehicle_types")
        ->orderby("id",'asc')
        ->get()
        ->toArray();
        return Inertia::render("UserPages/Renter/MyVehicles/MyVehicles",[
            "vehicle_types"=>$vehicle_types
        ]);
    }
    function  store(Request $request){
        $data = $request->session()->all();
        if($request->input("id") && 
        ($vehicle = DB::table("vehicles")
        ->where('user_id','=',$data['user_id'])
        ->where('id','=',$request->input("id"))
        ->first()
        )){
            
            $validator = Validator::make($request->all(), [
                'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
                'cr_file_number'=>'required|max:255',
                'cr_plate_number'=>'required|max:255',
                'cr_no'=>'required|max:255',
                'cr_vehicle_owner'=>'required|max:255',
                'or_expiration_date'=>  'required|date|date_format:Y-m-d|after:'.now()->toDateString(),
                'or_color'=>'required|max:255',
                ]
            );

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
          
            if($request->file('cr_picture')){
                $validator = Validator::make($request->all(), [
                    'cr_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->cr_picture =  self::store_image($request->file('cr_picture'),'cr_picture');
            }

            if($request->file('or_picture')){
                $validator = Validator::make($request->all(), [
                    'or_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->or_picture =  self::store_image($request->file('or_picture'),'or_picture');
            }

            if($request->file('front_side_picture')){
                $validator = Validator::make($request->all(), [
                    'front_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->front_side_picture =  self::store_image($request->file('front_side_picture'),'front_side_picture');
            }

            if($request->file('back_side_picture')){
                $validator = Validator::make($request->all(), [
                    'back_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->back_side_picture =  self::store_image($request->file('back_side_picture'),'back_side_picture');
            }
           
            if($request->file('right_side_picture')){
                $validator = Validator::make($request->all(), [
                    'right_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $vehicle->right_side_picture =  self::store_image($request->file('right_side_picture'),'right_side_picture');
            }
            if($request->file('left_side_picture')){
                $validator = Validator::make($request->all(), [
                    'left_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]);
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }
                $path = storage_path('app/private/left_side_picture/'. $vehicle->left_side_picture);
                if(file_exists($path)){
                    unlink($path);
                }
                $vehicle->left_side_picture =  self::store_image($request->file('left_side_picture'),'left_side_picture');
            }
            DB::table('vehicles')
                ->where('user_id','=',$data['user_id'])
                ->where('id','=',$request->input('id'))
                ->update([
                    'vehicle_type_id'=> $request->input('vehicle_type_id'),
                    'cr_file_number'=>$request->input('cr_file_number'),
                    'cr_plate_number'=>$request->input('cr_plate_number'),
                    'cr_no'=>$request->input('cr_no'),
                    'cr_vehicle_owner'=>$request->input('cr_vehicle_owner'),
                    'or_expiration_date'=>$request->input('or_expiration_date'),
                    'or_color'=>$request->input('or_color'),
                    'cr_picture' => $vehicle->cr_picture,
                    'or_picture' => $vehicle->or_picture,
                    'front_side_picture' => $vehicle->front_side_picture,
                    'back_side_picture' => $vehicle->back_side_picture,
                    'right_side_picture' => $vehicle->right_side_picture,
                    'left_side_picture' => $vehicle->left_side_picture,
                ]);
        }else{
            
            $validator = Validator::make($request->all(), [
                'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
                'cr_file_number'=>'required|max:255',
                'cr_plate_number'=>'required|max:255',
                'cr_no'=>'required|max:255',
                'cr_vehicle_owner'=>'required|max:255',
                'or_expiration_date'=>  'required|date|date_format:Y-m-d|after:'.now()->toDateString(),
                'or_color'=>'required|max:255',
                'cr_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'or_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'front_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'back_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'right_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                'left_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }

            DB::table('vehicles')
            ->insert([
                'user_id'=>$data['user_id'],
                'vehicle_type_id'=> $request->input('vehicle_type_id'),
                'cr_file_number'=>$request->input('cr_file_number'),
                'cr_plate_number'=>$request->input('cr_plate_number'),
                'cr_no'=>$request->input('cr_no'),
                'cr_vehicle_owner'=>$request->input('cr_vehicle_owner'),
                'or_expiration_date'=>$request->input('or_expiration_date'),
                'or_color'=>$request->input('or_color'),
                'cr_picture' => self::store_image($request->file('cr_picture'),'cr_picture'),
                'or_picture' => self::store_image($request->file('or_picture'),'or_picture'),
                'front_side_picture' => self::store_image($request->file('front_side_picture'),'front_side_picture'),
                'back_side_picture' => self::store_image($request->file('back_side_picture'),'back_side_picture'),
                'right_side_picture' => self::store_image($request->file('right_side_picture'),'right_side_picture'),
                'left_side_picture' => self::store_image($request->file('left_side_picture'),'left_side_picture'),
            ]);
            return 1;
        }
    }
    function store_image($file_input,$folder){
        return basename($file_input->store($folder)); 
    }

    public function add(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
            'cr_file_number'=>'required|max:255',
            'cr_plate_number'=>'required|max:255',
            'brand'=>'required|max:255',
            'cor_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
            'back_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
            'front_side_picture' => ['required',File::types(['png', 'jpg','jpeg'])->max(12 * 1024)],
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::table('vehicles_v2')
        ->insert([
            'user_id'=>$data['user_id'],
            'vehicle_type_id'=> $request->input('vehicle_type_id'),
            'cr_file_number'=>$request->input('cr_file_number'),
            'cr_plate_number'=>$request->input('cr_plate_number'),
            'brand'         => $request->input('brand'),
            'unit'         => $request->input('unit'),
            'cor_picture' => self::store_image($request->file('cor_picture'),'cor_picture'),
            'back_side_picture' => self::store_image($request->file('back_side_picture'),'back_side_picture'),
            'front_side_picture' => self::store_image($request->file('front_side_picture'),'front_side_picture'),
        ]);
        DB::table('notifications')
        ->insert([
            'user_id'=>0, // 0 to admin
            'created_by'=>$data['user_id'],
            'title' => 'New Vehicle Registration',
            'message'=> 'has created a new vehicle registration "'.$request->input('cr_file_number').'".'
        ]);
        return 1;
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
        $data = DB::table('vehicles_v2 as v')
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
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->where('user_id','=',$user_data['user_id'])
            ->where('cr_plate_number', 'like', "%{$search}%")
            ->where('cr_file_number', 'like', "%{$search}%")
            ->orderBy("id",'desc')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('vehicles_v2')
            ->where('user_id','=',$user_data['user_id'])
            ->where('cr_plate_number', 'like', "%{$search}%")
            ->where('cr_file_number', 'like', "%{$search}%")
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

    public function view(Request $request,$id){
        $user_data = $request->session()->all();
        $data = $request->session()->all();
        $detail = DB::table('vehicles_v2 as v')
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
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->where('user_id','=',$user_data['user_id'])
            ->where('v.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }

    public function edit(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'vehicle_type_id'=>  'required|integer|exists:vehicle_types,id',
            'cr_file_number'=>'required|max:255',
            'brand'=>'required|max:255',
            'cr_plate_number'=>'required|max:255',
            'cor_picture'=> 'nullable|file|mimes:jpg,jpeg,png,svg|max:20048', 
            'back_side_picture' => 'nullable|file|mimes:jpg,jpeg,png,svg|max:20048', 
            'front_side_picture'=> 'nullable|file|mimes:jpg,jpeg,png,svg|max:20048', 
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $updateData = [
            'brand'         => $request->input('brand'),
            'unit'         => $request->input('unit'),
            'vehicle_type_id'         => $request->input('vehicle_type_id'),
            'cr_file_number'         => $request->input('cr_file_number'),
            'cr_plate_number'  => $request->input('cr_plate_number'),
            'date_updated' => now(),
        ];
        
        if ($request->hasFile('cor_picture')) {
            $updateData['cor_picture'] = self::store_image($request->file('cor_picture'), 'cor_picture'); 
        }
        if ($request->hasFile('right_side_picture')) {
            $updateData['right_side_picture'] = self::store_image($request->file('right_side_picture'), 'right_side_picture'); 
        }
        if ($request->hasFile('left_side_picture')) {
            $updateData['left_side_picture'] = self::store_image($request->file('left_side_picture'), 'left_side_picture'); 
        }
        if ($request->hasFile('back_side_picture')) {
            $updateData['back_side_picture'] = self::store_image($request->file('back_side_picture'), 'back_side_picture'); 
        }
        if ($request->hasFile('front_side_picture')) {
            $updateData['front_side_picture'] = self::store_image($request->file('front_side_picture'), 'front_side_picture'); 
        }

        $result = DB::table('vehicles_v2')
            ->where('id', $request->input('id'))  
            ->where('user_id', $data['user_id'])  
            ->update($updateData);
    
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update vehicle.'], 500);
    }

    public function delete(Request $request){
        $data = $request->session()->all();
        $id = $request->input('id');

        $result = DB::table('vehicles_v2')
        ->where('id', $request->input('id'))  
        ->where('user_id', $data['user_id'])  
        ->delete();
    
        return $result ? response()->json(1) : response()->json(['error' => 'Failed to update vehicle.'], 500);
    }

    public function qr(Request $request,$id){
        $user_data = $request->session()->all();
        $detail = DB::table('vehicles_v2 as v')
            ->select(
                'v.id' ,
                'v.user_id' ,
                'v.is_approved' ,
                'v.cr_file_number',
                'v.cr_plate_number' ,
                'v.vehicle_type_id' ,
                'vt.type as vehicle_type',
                'vt.name as vehicle_type_name',
                'v.cor_picture' ,
                'v.cor_holding_picture' ,
                'v.left_side_picture' ,
                'v.right_side_picture' ,
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('status as t','t.id','v.status_id')
            ->where('user_id','=',$user_data['user_id'])
            ->where('v.id', $id)
            ->first();

        $options = new QROptions([
            'version'           => 5,              // Adjust QR version (1-40)
            'border'            => 5,              // Border size
            'bgColor'           => [0, 0, 0, 0],   // Transparent background
            'eccLevel'          => QRCode::ECC_L,  // Error correction level
            'outputType'        => QRCode::OUTPUT_IMAGE_PNG, // Output as PNG image
            'returnResource' => true,
        ]);
            
            // Create a new QR code instance
        $qrcode = new QRCode($options);
            
            // Your data for the QR code
        if( $_SERVER['SERVER_PORT'] == 80){
            $data = 'http://127.0.0.1:8000/vehicle/qr/'.$detail->hash;
        }else{
            $data = 'https://www.parkaki.online/vehicle/qr/'.$detail->hash;
        }
        
        $base64QR = $qrcode->render($data);

            
        ob_start(); // Start output buffering
        imagepng($base64QR); // Output the image as PNG to the buffer
        $imageData = ob_get_contents(); // Get the image data from the buffer
        ob_end_clean(); // Clean the buffer
        return response($imageData, 200)
            ->header('Content-Type', 'image/png')
            ->header('Content-Disposition', 'inline; filename="'.$detail->vehicle_type_name." - ".$detail->cr_file_number.'.png"');
         
    }

    public function default(Request $request){
        $user_data = $request->session()->all();
        $id = $request->input('id');
        $vehicle = DB::table('vehicles_v2 as v')
        ->select(
            'v.id' ,
            'v.user_id' ,
            'v.is_approved' ,
            'v.cr_file_number',
            'v.cr_plate_number' ,
            'v.vehicle_type_id' ,
            'vt.type as vehicle_type',
            'vt.name as vehicle_type_name',
            'v.cor_picture' ,
            'v.cor_holding_picture' ,
            'v.left_side_picture' ,
            'v.right_side_picture' ,
            't.name as status_name',
            'v.back_side_picture' ,
            'v.front_side_picture' ,
            'v.hash',
            'v.date_created' ,
            'v.date_updated' ,
        )
        ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
        ->join('status as t','t.id','v.status_id')
        ->where('user_id','=',$user_data['user_id'])
        ->where('v.id', $id)
        ->first();

        $result = DB::table('users')
            ->where('id','=',$user_data['user_id'])
            ->update([
                'default_vehicle_id'=>$vehicle->id
            ]);
        return $result;
    }

    public function get_default(Request $request){
        $user_data = $request->session()->all();
        $detail = DB::table('vehicles_v2 as v')
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
                't.name as status_name',
                'v.back_side_picture' ,
                'v.front_side_picture' ,
                'v.hash',
                'v.date_created' ,
                'v.date_updated' ,
            )
            ->join('vehicle_types as vt','vt.id','v.vehicle_type_id')
            ->join('users as u','u.default_vehicle_id','v.id')
            ->join('status as t','t.id','v.status_id')
            ->where('user_id','=',$user_data['user_id'])
            // ->where('v.id', $id)
            ->first();
        return response()->json([
            'detail' => json_encode($detail)
        ], 200);
    }
}
