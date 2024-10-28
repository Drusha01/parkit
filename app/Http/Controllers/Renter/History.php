<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class History extends Controller
{
    function index(){
        return Inertia("UserPages/Renter/History/History");
    }
}
