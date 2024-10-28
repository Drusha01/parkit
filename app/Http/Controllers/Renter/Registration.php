<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Registration extends Controller
{
    function index(){
       return Inertia("UserPages/Renter/Registration/Registration");
    }
}
