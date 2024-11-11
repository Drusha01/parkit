<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WebPages extends Controller
{
    function homepage(Request $request){
        return Inertia::render("webPages/Home",[
        ]);
    }
    function browse(Request $request){
        return Inertia('webPages/Browse');
    }
    function howitworks(Request $request){
        return Inertia('webPages/HowItWorks');
    }
    function whyparkit(Request $request){
        return Inertia('webPages/WhyParkIt');
    }
    function aboutus(Request $request){
        return Inertia('webPages/AboutUs');
    }

}
