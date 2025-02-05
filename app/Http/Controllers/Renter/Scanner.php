<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Scanner extends Controller
{
    function index(){
        return Inertia("UserPages/Renter/Scan/Scan");
    }
}
