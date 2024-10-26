<?php

namespace App\Http\Controllers\SpaceOwner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Notification extends Controller
{
    function index(){
        return Inertia("UserPages/SpaceOwner/Notification/Notification");
    }
}
