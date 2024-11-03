<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pages\WebPages;

// authentication
use App\Http\Controllers\Authentication\Signup;
use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\ForgotPassword;

// renter 
use App\Http\Controllers\Renter\Browse as RenterBrowse;
use App\Http\Controllers\Renter\Dashboard as RenterDashboard;
use App\Http\Controllers\Renter\FeedBack as RenterFeedBack;
use App\Http\Controllers\Renter\HelpAndSupport as RenterHelpAndSupport;
use App\Http\Controllers\Renter\History as RenterHistory;
use App\Http\Controllers\Renter\Profile as RenterProfile;
use App\Http\Controllers\Renter\Registration as RenterRegistration;
use App\Http\Controllers\Renter\Vehicles as RenterVehicles;
use App\Http\Controllers\Renter\Wallet as RenterWallet; 
use App\Http\Controllers\Renter\Privacy as RenterPrivacy;
// space owner
use App\Http\Controllers\SpaceOwner\Dashboard as SpaceOwnerDashboard;
use App\Http\Controllers\SpaceOwner\Feedback as SpaceOwnerFeedback;
use App\Http\Controllers\SpaceOwner\HelpAndSupport as SpaceOwnerHelpAndSupport;
use App\Http\Controllers\SpaceOwner\History as SpaceOwnerHistory;
use App\Http\Controllers\SpaceOwner\Notification as SpaceOwnerNotification;
use App\Http\Controllers\SpaceOwner\Profile as SpaceOwnerProfile;
use App\Http\Controllers\SpaceOwner\Spaces as SpaceOwnerSpaces;
use App\Http\Controllers\SpaceOwner\Wallet as SpaceOwnerWallet;


// middleware
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\IsRenter;
use App\Http\Middleware\IsSpaceOwner;
use App\Http\Middleware\IsUnauthenticated;
use App\Http\Middleware\IsValid;


Route::get('/', [WebPages::class, 'homepage'])->name('page.homepage');
Route::get('/browse', [WebPages::class, 'browse'])->name('page.browse');
Route::get('/howitworks', [WebPages::class, 'howitworks'])->name('page.howitworks');
Route::get('/whyparkit', [WebPages::class, 'whyparkit'])->name('page.whyparkit');
Route::get('/aboutus', [WebPages::class, 'aboutus'])->name('page.aboutus');


// unauthenticated
Route::middleware([IsUnauthenticated::class])->group(function (){
    Route::get('/login', [Login::class, 'index'])->name('authentication.login.index');
    Route::post('/login', [Login::class, 'login'])->name('authentication.login.authenticate');
    Route::post('/verify',[Signup::class,'send_email'])->name('authentication.email.verification');
    Route::post('/code',[Signup::class,'verify_code'])->name('authentication.email.code');
    Route::get('/signup', [Signup::class, 'index'])->name('authentication.signup.index');
    Route::post('/signup', [Signup::class, 'signup'])->name('authentication.signup.create.account');
    Route::get('/forgotpassword', [ForgotPassword::class, 'forgotpassword'])->name('authentication.forgotpassword');

    // oauth
});

// authenticated
// renter
Route::middleware([])->group(function () {
    Route::prefix('renter')->group(function () {
        Route::get('/', [RenterDashboard::class, 'index'])->name('renter.default.index');
        Route::prefix('browse')->group(function () {
            Route::get('/', [RenterBrowse::class, 'index'])->name('renter.browse.index');
        });
        Route::prefix('dashboard')->group(function () {
            Route::get('/', [RenterDashboard::class, 'index'])->name('renter.dashboard.index');
        });
        Route::prefix('feedback')->group(function () {
            Route::get('/', [RenterFeedBack::class, 'index'])->name('renter.feedback.index');
        });
        Route::prefix('helpandsupport')->group(function () {
            Route::get('/', [RenterHelpAndSupport::class, 'index'])->name('renter.helpandsupport.index');
        });
        Route::prefix('history')->group(function () {
            Route::get('/', [RenterHistory::class, 'index'])->name('renter.history.index');
        });
        Route::prefix('profile')->group(function () {
            Route::get('/', [RenterProfile::class, 'index'])->name('renter.profile.index');
        });
        Route::prefix('registration')->group(function () {
            Route::get('/', [RenterRegistration::class, 'index'])->name('renter.registration.index');
        });
        Route::prefix('vehicles')->group(function () {
            Route::get('/', [RenterVehicles::class, 'index'])->name('renter.vehicles.index');
        });
        Route::prefix('wallet')->group(callback: function () {
            Route::get('/', [RenterWallet::class, 'index'])->name('renter.wallet.index');
        });
        Route::prefix('privacy')->group(callback: function () {
            Route::get('/', [RenterPrivacy::class, 'index'])->name('renter.privacy.index');
        });
    });
});

// space owner
Route::middleware([])->group(function () {
    Route::prefix('spaceowner')->group(function () {
        Route::get('/', [SpaceOwnerDashboard::class, 'index'])->name('spaceowner.default.index');
        Route::prefix('dashboard')->group(function () {
            Route::get('/', [SpaceOwnerDashboard::class, 'index'])->name('spaceowner.dashboard.index');
        });
        Route::prefix('feedback')->group(function () {
            Route::get('/', [SpaceOwnerFeedback::class, 'index'])->name('spaceowner.feedback.index');
        });
        Route::prefix('helpandsupport')->group(function () {
            Route::get('/', [SpaceOwnerHelpAndSupport::class, 'index'])->name('spaceowner.helpandsupport.index');
        });
        Route::prefix('history')->group(function () {
            Route::get('/', [SpaceOwnerHistory::class, 'index'])->name('spaceowner.history.index');
        });
        Route::prefix('notifications')->group(function () {
            Route::get('/', [SpaceOwnerNotification::class, 'index'])->name('spaceowner.notifications.index');
        });
        Route::prefix('profile')->group(function () {
            Route::get('/', [SpaceOwnerProfile::class, 'index'])->name('spaceowner.profile.index');
        });
        Route::prefix('spaces')->group(function () {
            Route::get('/', [SpaceOwnerSpaces::class, 'index'])->name('spaceowner.spaces.index');
        });
        Route::prefix('wallet')->group(function () {
            Route::get('/', [SpaceOwnerWallet::class, 'index'])->name('spaceowner.wallet.index');
        });
    });
});
// super admin


Route::get('/temp',function (){ return view("home");});