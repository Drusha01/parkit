<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class History extends Controller
{
    function index(): string{
        return "renter history";
    }
}
