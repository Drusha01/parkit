<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HelpAndSupport extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/HelpAndSupport/HelpAndSupport");
    }
}
