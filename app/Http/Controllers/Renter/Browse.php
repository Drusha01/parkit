<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Browse extends Controller
{
    function index(){
        return "renter browse";
    }
}
