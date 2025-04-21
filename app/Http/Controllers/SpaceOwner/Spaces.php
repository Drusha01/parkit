<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use App\Models\Space;
use chillerlan\QRCode\{QRCode, QROptions};

class Spaces extends Controller
{

    public function all(Request $request){
        $user_data = $request->session()->all();
        $rows = $request->input('rows');
        $search = $request->input('search');
        $page = $request->input('page');
        if(!isset($page)){
            $page = 1;
        }
        if($rows > 100){
            $rows = 100;
        }
        $data = DB::table('spaces as s')
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
                DB::raw('SUM(sva.vehicle_count * vt.parking_unit) as vehicle_count '),
                DB::raw('SUM(sva.current_vehicle_count * vt.parking_unit) as current_vehicle_count')
            )
            ->join('space_vehicle_alotments as sva', 'sva.space_id', '=', 's.id')
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->join("status as st",'s.status','=','st.id')
            ->where('user_id',"=", $user_data['user_id'])
            ->Where('s.name', 'like', "%{$search}%")
            ->groupBy('s.id')
            ->offset(($page - 1) * $rows)  
            ->limit($rows) 
            ->get()
            ->toArray();

        $total = DB::table('spaces')
            ->where('user_id', $user_data['user_id'])
            ->Where('name', 'like', "%{$search}%")
            ->count(); 

        return response()->json([
            'data' => $data,
            'total' =>$total,
            'page' =>$page,
            'rows'=>$rows,
            'search'=>$search,
        ], 200);
    }

    function view(Request $request,$id){
        $data = $request->session()->all();
        $detail  = DB::table('spaces as s')
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
                'st.name as status_name'
            )
            ->join("status as st",'s.status','=','st.id')
            ->where('s.id', $id)
            ->where('s.user_id', $data['user_id']) 
            ->first();
            $space_pictures = DB::table("space_pictures")
            ->where("space_id",'=',$id)
            ->get()
            ->toArray();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $allotments = DB::table('space_vehicle_alotments as sva')
            ->select(
                "sva.id",
                "space_id",
                "vehicle_type_id",
                "vehicle_count",
                "rent_rate_type_id",
                "rent_duration",
                "rent_duration_rate",
                "rent_flat_rate_duration",
                "rent_flat_rate",
                "sva.date_created",
                "sva.date_updated",
                "vt.type as vehicle_type",
                "vt.parking_unit",
                "vt.name as vehicle_name",
                "vt.description as vehicle_description",
                "vt.icon as vehicle_icon",
                "rrt.name as rent_rate_name",
            )
            ->where("space_id",'=',$id)
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
            ->get()
            ->toArray();
        return response()->json([
            'detail' => json_encode($detail),
            'space_pictures'=>json_encode($space_pictures),
            'vehicle_types'=> json_encode($vehicle_types),
            'rent_rate_types'=> json_encode($rent_rate_types),
            'allotments'=>json_encode($allotments)
        ], 200);
    }
    function index(Request $request){
        $data = $request->session()->all();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();
        return Inertia("UserPages/SpaceOwner/MySpaces/MySpaces",[
            'vehicle_types'=>$vehicle_types,
            'rent_rate_types'=>$rent_rate_types
        ]);
    }

    function add_index(Request $request){
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        return Inertia::render("UserPages/SpaceOwner/MySpaces/AddSpace",[
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types
        ]);
    }

    function store_image($file_input,$folder){
        return basename($file_input->store($folder)); 
    }

    function add_space(Request $request){
        $data = $request->session()->all();
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:spaces,name', 
            'rules' => 'required|string|max:500',
            'description' => 'nullable|string',
            'location_long' => 'required|numeric|between:-180,180',
            'location_lat' => 'required|numeric|between:-90,90',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $vehicleAllotments = $request->input('vehicleAllotments');

        if ($vehicleAllotments) {
            foreach ($vehicleAllotments as $index => $vehicleAllotment) {
                $validator = Validator::make($vehicleAllotment, [
                    'vehicle_type_id' => 'required|integer|exists:vehicle_types,id',
                    'vehicle_type_name' => 'required|string|max:255',
                    'number_of_vehicles' => 'required|integer|min:1',
                    'rent_rate_type_id' => 'required|integer|exists:rent_rate_types,id',
                    'rent_rate_type_name' => 'required|string|max:255',
                    'duration_fee' => 'required|numeric|min:0',
                    'flat_rate_fee' => 'required|numeric|min:0',
                ]);

                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                        'index' => $index, // Include the index of the failing item for better debugging
                    ], 422);
                }
            }
            foreach ($vehicleAllotments as $index => $vehicleAllotment) { 
                $vehicleData = [
                    'vehicle_type_id' => $vehicleAllotment['vehicle_type_id'],  // Assuming 'vehicle_type_id' is the vehicle ID
                    'vehicle_count' => $vehicleAllotment['number_of_vehicles'],
                    'rent_rate_type_id' => $vehicleAllotment['rent_rate_type_id'],
                    'rent_duration' => $vehicleAllotment['duration_month'] * 30 * 24 * 60 * 60 + // Convert months to seconds
                                    $vehicleAllotment['duration_day'] * 24 * 60 * 60 + // Convert days to seconds
                                    $vehicleAllotment['duration_hour'] * 60 * 60,  // Convert hours to seconds
                    'rent_duration_rate' => $vehicleAllotment['duration_fee'],
                    'rent_flat_rate_duration' => $vehicleAllotment['flat_rate_month'] * 30 * 24 * 60 * 60 + // Convert months to seconds
                                            $vehicleAllotment['flat_rate_day'] * 24 * 60 * 60 + // Convert days to seconds
                                            $vehicleAllotment['flat_rate_hour'] * 60 * 60,  // Convert hours to seconds
                    'rent_flat_rate' => $vehicleAllotment['flat_rate_fee'],
                ];
                // dd($vehicleData['rent_rate_type_id'],$vehicleData['rent_duration']);
                if ($vehicleAllotment['rent_rate_type_id'] !=1 &&  $vehicleData['rent_duration'] <=0){
                    return response()->json([
                        'message' => 'Please Input duration on row '.($index +1). '.',
                    ], 422);
                }
                // if ( $vehicleData['rent_flat_rate_duration'] <=0){
                //     return response()->json([
                //         'message' => 'Please Input flat duration on row '.($index +1). '.',
                //     ], 422);
                // }
            }
        }else{
            return response()->json([
                'message' => 'At least vehicle allotment is required.',
            ], 422);
        }

        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');
            if (count($uploadedFiles) < 1) {
                return response()->json([
                    'message' => 'At least one file is required.',
                ], 422);
            }
            $errors = [];
            foreach ($uploadedFiles as $index => $file) {
                if ($file->isValid()) {
                    $validator = Validator::make(
                        ['file' => $file],
                        ['file' => 'required|image|mimes:jpeg,png,jpg|max:5120'] // Max size: 5MB
                    );
                    if ($validator->fails()) {
                        $errors[$index] = $validator->errors()->first();
                    }
                } else {
                    $errors[$index] = 'The file is invalid.';
                }
            }
        
            if (!empty($errors)) {
                return response()->json([
                    'message' => 'Some files failed validation.',
                    'errors' => $errors,
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'At least one file is required.',
            ], 422);
        }
        
        $space_id = DB::table('spaces')->insertGetId([
            'user_id' => $data['user_id'],
            'is_approved' => 0,
            'name' => $request->input('name'),
            'rules' => $request->input('rules'),
            'description' => $request->input('description'),
            'location_long' => $request->input('location_long'),
            'location_lat' => $request->input('location_lat'),
            'overall_rating' => null,
            'date_created' => now(),
            'date_updated' => now(),
        ]);

        DB::table('notifications')
            ->insert([
                'user_id'=>0, // 0 to admin
                'created_by'=>$data['user_id'],
                'title' => 'Parking Space Created',
                'message'=> 'has created a parking space "'.$request->input('name').'".'
            ]);


        $uploadedFiles = $request->file('files');
        foreach ($uploadedFiles as $index => $file) {
            if ($file->isValid()) {
                // Insert the file path into the space_pictures table
                DB::table('space_pictures')->insert([
                    'space_id' => $space_id, // Assuming $space_id is already defined
                    'content' => self::store_image($file,'spaces_content'),  
                    'date_created' => now(),
                    'date_updated' => now(),
                ]);
            } else {
                // Handle invalid file
                return response()->json([
                    'message' => 'One or more files are invalid.',
                ], 422);
            }
        }


        if ($vehicleAllotments) {
            foreach ($vehicleAllotments as $vehicleAllotment) {
                $vehicleData = [
                    'space_id' => $space_id,
                    'vehicle_type_id' => $vehicleAllotment['vehicle_type_id'],  // Assuming 'vehicle_type_id' is the vehicle ID
                    'vehicle_count' => $vehicleAllotment['number_of_vehicles'],
                    'rent_rate_type_id' => $vehicleAllotment['rent_rate_type_id'],
                    'rent_duration' => $vehicleAllotment['duration_month'] * 30 * 24 * 60 * 60 + // Convert months to seconds
                                    $vehicleAllotment['duration_day'] * 24 * 60 * 60 + // Convert days to seconds
                                    $vehicleAllotment['duration_hour'] * 60 * 60,  // Convert hours to seconds
                    'rent_duration_rate' => $vehicleAllotment['duration_fee'],
                    'rent_flat_rate_duration' => $vehicleAllotment['flat_rate_month'] * 30 * 24 * 60 * 60 + // Convert months to seconds
                                            $vehicleAllotment['flat_rate_day'] * 24 * 60 * 60 + // Convert days to seconds
                                            $vehicleAllotment['flat_rate_hour'] * 60 * 60,  // Convert hours to seconds
                    'rent_flat_rate' => $vehicleAllotment['flat_rate_fee'],
                    'date_created' => now(),
                    'date_updated' => now(),
                ];

                // Insert data into the space_vehicle_alotments table
                DB::table('space_vehicle_alotments')->insert($vehicleData);
            }
        } else {
            return response()->json([
                'message' => 'No vehicle allotments provided.',
            ], 400);
        }
        return 1;
    }

    public function delete(Request $request){
        $data = $request->session()->all();
        $id = $request->input('id');
        $space = DB::table('spaces')
            ->where('id', $id)
            ->where('user_id', $data['user_id']) 
            ->first();

        if (!$space) {
            return redirect()->back()->with('error', 'Space not found or you do not have permission to delete it.');
        }

        if ($space->is_approved == 0) {
            DB::table('spaces')
            ->where('id', $id)
            ->where('user_id', $data['user_id']) 
            ->delete();
        }
        return 1;
    }
    public function edit(Request $request,$id){
        $data = $request->session()->all();
        $space = DB::table('spaces')
            ->where('id', $id)
            ->where('user_id', $data['user_id']) 
            ->first();
        $space_pictures = DB::table("space_pictures")
            ->where("space_id",'=',$space->id)
            ->get()
            ->toArray();
        $vehicle_types = DB::table("vehicle_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $rent_rate_types = DB::table("rent_rate_types")
            ->orderby("id",'asc')
            ->get()
            ->toArray();

        $allotments = DB::table('space_vehicle_alotments as sva')
            ->select(
                "sva.id",
                "space_id",
                "vehicle_type_id",
                "vehicle_count",
                "rent_rate_type_id",
                "rent_duration",
                "rent_duration_rate",
                "rent_flat_rate_duration",
                "rent_flat_rate",
                "sva.date_created",
                "sva.date_updated",
                "vt.type as vehicle_type",
                "vt.name as vehicle_name",
                "vt.description as vehicle_description",
                "vt.icon as vehicle_icon",
                "rrt.name as rent_rate_name",
            )
            ->where("space_id",'=',$space->id)
            ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
            ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
            ->get()
            ->toArray();
        return Inertia("UserPages/SpaceOwner/MySpaces/EditSpace",[
            'space'=>$space,
            'space_pictures'=>$space_pictures,
            'vehicle_types'=> $vehicle_types,
            'rent_rate_types'=> $rent_rate_types,
            'allotments'=>$allotments
        ]);
    }

    public function save_space(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:spaces,name,'.$request->id,
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::table('spaces')
        ->where('id','=',$request->input('id'))
        ->update([
            'description'=> $request->input('description'),
            'name' => $request->input('name'),    
            'rules' => $request->input('rules'),
        ]);
    }

    public function delete_content(Request $request){
        $data = $request->session()->all();
        $space_pictures = DB::table("space_pictures")
            ->where("space_id",'=',$request->input("space_id"))
            ->where("id",'=',$request->input("id"))
            ->delete();
        return 1;
    }

    public function all_content(Request $request,$space_id){
        $space_pictures = DB::table("space_pictures")
            ->where("space_id",'=',$space_id)
            ->get()
            ->toArray();
        return response()->json([
                'space_pictures' => $space_pictures,
        ], 200);
    }

    public function save_location(Request $request){
        $data = $request->session()->all();
        return DB::table('spaces')
        ->where('id', $request->input("space_id"))
        ->where('user_id', $data['user_id'])
        ->update([
            'location_long' => $request->input("location_long"),
            'location_lat' =>$request->input("location_lat")
        ]);
    }

    public function add_content(Request $request){
        $space_id = $request->input("space_id");
        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files');
            if (count($uploadedFiles) < 1) {
                return response()->json([
                    'message' => 'At least one file is required.',
                ], 422);
            }
            $errors = [];
            foreach ($uploadedFiles as $index => $file) {
                if ($file->isValid()) {
                    $validator = Validator::make(
                        ['file' => $file],
                        ['file' => 'required|image|mimes:jpeg,png,jpg|max:5120'] // Max size: 5MB
                    );
                    if ($validator->fails()) {
                        $errors[$index] = $validator->errors()->first();
                    }
                } else {
                    $errors[$index] = 'The file is invalid.';
                }
            }
        
            if (!empty($errors)) {
                return response()->json([
                    'message' => 'Some files failed validation.',
                    'errors' => $errors,
                ], 422);
            }
        } else {
            return response()->json([
                'message' => 'At least one file is required.',
            ], 422);
        }
        $uploadedFiles = $request->file('files');
        foreach ($uploadedFiles as $index => $file) {
            if ($file->isValid()) {
                // Insert the file path into the space_pictures table
                DB::table('space_pictures')->insert([
                    'space_id' => $space_id, // Assuming $space_id is already defined
                    'content' => self::store_image($file,'spaces_content'),  
                    'date_created' => now(),
                    'date_updated' => now(),
                ]);
            } else {
                // Handle invalid file
                return response()->json([
                    'message' => 'One or more files are invalid.',
                ], 422);
            }
        }

        return 1;
    }

    public function all_allotments(Request $request,$space_id){
        $space_allotments = DB::table('space_vehicle_alotments as sva')
        ->select(
            "sva.id",
            "space_id",
            "vehicle_type_id",
            "vehicle_count",
            "rent_rate_type_id",
            "rent_duration",
            "rent_duration_rate",
            "rent_flat_rate_duration",
            "rent_flat_rate",
            'current_vehicle_count',
            "sva.date_created",
            "sva.date_updated",
            "vt.type as vehicle_type",
            "vt.parking_unit",
            "vt.name as vehicle_name",
            "vt.description as vehicle_description",
            "vt.icon as vehicle_icon",
            "rrt.name as rent_rate_name",
        )
        ->where("space_id",'=',$space_id)
        ->where('sva.is_active','=',1)
        ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
        ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
        ->get()
        ->toArray();
        return response()->json([
                'space_allotments' => $space_allotments,
        ], 200);
    }

    public function qr(Request $request,$id){
        $user_data = $request->session()->all();
        $data = $request->session()->all();
        $detail = DB::table('spaces')
            ->where('id', $id)
            ->where('user_id', $data['user_id']) 
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
            $data = 'http://127.0.0.1:8000/spaces/qr/'.$detail->hash;
        }else{
            $data = 'https://www.parkaki.online/spaces/qr/'.$detail->hash;
        }
        
        $base64QR = $qrcode->render($data);

            
        ob_start(); // Start output buffering
        imagepng($base64QR); // Output the image as PNG to the buffer
        $imageData = ob_get_contents(); // Get the image data from the buffer
        ob_end_clean(); // Clean the buffer
        return response($imageData, 200)
            ->header('Content-Type', 'image/png')
            ->header('Content-Disposition', 'inline; filename="'.$detail->name.'.png"');
         
    }

    public function add_vehicle_allotments(Request $request){
        $vehicleData = [
            'space_id' => $request->input('space_id'),
            'vehicle_type_id' => $request->input('vehicle_type_id'),  // Assuming 'vehicle_type_id' is the vehicle ID
            'vehicle_count' => $request->input('number_of_vehicles'),
            'rent_rate_type_id' => $request->input('rent_rate_type_id'),
            'rent_duration' => $request->input('duration_month') * 30 * 24 * 60 * 60 + // Convert months to seconds
                            $request->input('duration_day') * 24 * 60 * 60 + // Convert days to seconds
                            $request->input('duration_hour') * 60 * 60,  // Convert hours to seconds
            'rent_duration_rate' => $request->input('duration_fee'),
            'rent_flat_rate_duration' => $request->input('flat_rate_month') * 30 * 24 * 60 * 60 + // Convert months to seconds
                                    $request->input('flat_rate_day') * 24 * 60 * 60 + // Convert days to seconds
                                    $request->input('flat_rate_hour') * 60 * 60,  // Convert hours to seconds
            'rent_flat_rate' => $request->input('flat_rate_fee'),
            'date_created' => now(),
            'date_updated' => now(),
        ];
      
        $validator = Validator::make($request->input(), [
            'vehicle_type_id' => 'required|integer|exists:vehicle_types,id',
            'number_of_vehicles' => 'required|integer|min:1',
            'rent_rate_type_id' => 'required|integer|exists:rent_rate_types,id',
            'duration_fee' => 'required|numeric|min:0',
            'flat_rate_fee' => 'required|numeric|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
      
        if(DB::table('space_vehicle_alotments')
        ->where('space_id','=',$request->input('space_id'))
        ->where('vehicle_type_id','=',$request->input('vehicle_type_id'))
        ->first()
        ){
            return response()->json([
                'errors' => ['Vehicle type already exist'=>'Vehicle type already exist'],
            ], 422);
        }

        if( DB::table('space_vehicle_alotments')->insert($vehicleData)){
            return 1;
        }
    }

    public function view_allotment(Request $request,$id){
        $space_allotments = DB::table('space_vehicle_alotments as sva')
        ->select(
            "sva.id",
            "space_id",
            "vehicle_type_id",
            "vehicle_count",
            "rent_rate_type_id",
            "rent_duration",
            "rent_duration_rate",
            "rent_flat_rate_duration",
            "rent_flat_rate",
            'current_vehicle_count',
            "sva.date_created",
            "sva.date_updated",
            "vt.type as vehicle_type",
            "vt.parking_unit",
            "vt.name as vehicle_name",
            "vt.description as vehicle_description",
            "vt.icon as vehicle_icon",
            "rrt.name as rent_rate_name",
        )
        ->join('vehicle_types as vt','vt.id','sva.vehicle_type_id')
        ->join('rent_rate_types as rrt','rrt.id','sva.rent_rate_type_id')
        ->where('sva.id','=',$id)
        ->first();
        return response()->json([
                'space_allotments' => $space_allotments,
        ], 200);
    }


    public function edit_vehicle_allotments(Request $request){
        $vehicleData = [
            'space_id' => $request->input('space_id'),
            'vehicle_type_id' => $request->input('vehicle_type_id'),  // Assuming 'vehicle_type_id' is the vehicle ID
            'vehicle_count' => $request->input('number_of_vehicles'),
            'rent_rate_type_id' => $request->input('rent_rate_type_id'),
            'rent_duration' => $request->input('duration_month') * 30 * 24 * 60 * 60 + // Convert months to seconds
                            $request->input('duration_day') * 24 * 60 * 60 + // Convert days to seconds
                            $request->input('duration_hour') * 60 * 60,  // Convert hours to seconds
            'rent_duration_rate' => $request->input('duration_fee'),
            'rent_flat_rate_duration' => $request->input('flat_rate_month') * 30 * 24 * 60 * 60 + // Convert months to seconds
                                    $request->input('flat_rate_day') * 24 * 60 * 60 + // Convert days to seconds
                                    $request->input('flat_rate_hour') * 60 * 60,  // Convert hours to seconds
            'rent_flat_rate' => $request->input('flat_rate_fee'),
            'date_created' => now(),
            'date_updated' => now(),
        ];
      
        $validator = Validator::make($request->input(), [
            'vehicle_type_id' => 'required|integer|exists:vehicle_types,id',
            'number_of_vehicles' => 'required|integer|min:1',
            'rent_rate_type_id' => 'required|integer|exists:rent_rate_types,id',
            'duration_fee' => 'required|numeric|min:0',
            'flat_rate_fee' => 'required|numeric|min:0',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
      
        if(DB::table('space_vehicle_alotments')
        ->where('id','<>',$request->input('id'))
        ->where('space_id','=',$request->input('space_id'))
        ->where('vehicle_type_id','=',$request->input('vehicle_type_id'))
        ->first()
        ){
            return response()->json([
                'errors' => ['Vehicle type already exist'=>'Vehicle type already exist'],
            ], 422);
        }

        if( DB::table('space_vehicle_alotments')
        ->where('id','=',$request->input('id'))->update($vehicleData)){
            return 1;
        }
    }
    public function delete_vehicle_allotments(Request $request){
        return DB::table('space_vehicle_alotments')
        ->where('id','=',$request->input('id'))
        ->update(['is_active'=>0]);
    }
}
