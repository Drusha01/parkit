<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;
class RenterController extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Renter/Renter",[
        ]);
    }
}
