<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebPages extends Controller
{
    function homepage(){
        return Inertia('webPages/Home');
    }
    function browse(){
        return Inertia('webPages/Browse');
    }
    function howitworks(){
        return Inertia('webPages/HowItWorks');
    }
    function whyparkit(): Response|ResponseFactory{
        return Inertia('webPages/WhyParkIt');
    }
    function aboutus(){
        return Inertia('webPages/AboutUs');
    }

}
