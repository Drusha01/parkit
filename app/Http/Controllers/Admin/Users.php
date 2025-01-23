<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Users extends Controller
{
    public function index(Request $request){
        return Inertia("UserPages/Admin/Users/Users",[
        ]);
    }
}
