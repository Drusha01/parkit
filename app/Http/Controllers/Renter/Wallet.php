<?php

namespace App\Http\Controllers\Renter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Wallet extends Controller
{
    function index(): string{
        return "renter wallet";
    }
}
