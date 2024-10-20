<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pages\WebPages;
use App\Http\Controllers\Authentication\Signup;
use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\ForgotPassword;

Route::get('/', [WebPages::class, 'homepage'])->name('page.homepage');
Route::get('/browse', [WebPages::class, 'browse'])->name('page.browse');
Route::get('/howitworks', [WebPages::class, 'howitworks'])->name('page.howitworks');
Route::get('/whyparkit', [WebPages::class, 'whyparkit'])->name('page.whyparkit');
Route::get('/aboutus', [WebPages::class, 'aboutus'])->name('page.aboutus');


Route::get('/login', [Login::class, 'login'])->name('authentication.login');
Route::get('/signup', [Signup::class, 'signup'])->name('authentication.signup');
Route::get('/forgotpassword', [ForgotPassword::class, 'forgotpassword'])->name('authentication.forgotpassword');

Route::get('/temp/',function (){ return view("home");});