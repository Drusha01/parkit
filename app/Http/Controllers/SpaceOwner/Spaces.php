<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class Spaces extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/MySpaces/MySpaces");
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

    function add_space(Request $request){

        $request->input("name");
        $request->input("rules");
        $request->input("description");
        $request->input("area_m2");
        $request->input("location_long");
        $request->input("location_lat");

        $vehicleAllotments = $request->input('vehicleAllotments');
        if($vehicleAllotments){
            
            foreach ($vehicleAllotments as $index => $vehicleAllotment) {
                dd($vehicleAllotment);
            }
        }

        if ($request->hasFile('files')) {
            $uploadedFiles = $request->file('files'); // Retrieve the array of files

            foreach ($uploadedFiles as $index => $file) {
                // Ensure this is a valid uploaded file
                if ($file->isValid()) {
                    dd("asdfsadf");
                    // Save the file to storage (e.g., 'public/uploads')
                    $filePath = $file->store('uploads', 'public');

                    // Optional: Save file path or additional info to the database
                    // Example:
                    // UploadedFile::create([
                    //     'original_name' => $file->getClientOriginalName(),
                    //     'path' => $filePath,
                    //     'size' => $file->getSize(),
                    // ]);

                    // Log the file information for debugging (optional)
                } else {
                }
            }
        }
    }
}
