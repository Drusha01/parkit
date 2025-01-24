<?php

use Laravel\Socialite\Facades\Socialite;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pages\WebPages;

use App\Http\Controllers\FileController;
use App\Http\Controllers\Seach\SearchAPI;
// authentication
use App\Http\Controllers\Authentication\ForgotPassword;
use App\Http\Controllers\Authentication\Login;
use App\Http\Controllers\Authentication\Logout;
use App\Http\Controllers\Authentication\Signup;
use App\Http\Controllers\Authentication\OAuthController;

// renter 
use App\Http\Controllers\Renter\Browse as RenterBrowse;
use App\Http\Controllers\Renter\Dashboard as RenterDashboard;
use App\Http\Controllers\Renter\FeedBack as RenterFeedBack;
use App\Http\Controllers\Renter\HelpAndSupport as RenterHelpAndSupport;
use App\Http\Controllers\Renter\License as RenterLicense;
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

// admin
use App\Http\Controllers\Admin\Dashboard as AdminDashboard;
use App\Http\Controllers\Admin\Licenses as AdminLicenses;
use App\Http\Controllers\Admin\Profile as AdminProfile;
use App\Http\Controllers\Admin\RenterController as AdminRenterController;
use App\Http\Controllers\Admin\SpaceOwnerController as AdminSpaceOwnerController;
use App\Http\Controllers\Admin\Spaces as AdminSpaces;
use App\Http\Controllers\Admin\Users as AdminUsers;
use App\Http\Controllers\Admin\Vehicles as AdminVehicles;
use App\Http\Controllers\Admin\VehicleTypes as AdminVehicleTypes;
use App\Http\Controllers\Admin\Wallet as AdminWallet;



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
Route::get('/driverfaq', [WebPages::class, 'driverfaq'])->name('page.driverfaq');
Route::get('/privacypolicy', [WebPages::class, 'privacypolicy'])->name('page.privacypolicy');



// unauthenticated
Route::middleware([IsUnauthenticated::class])->group(function (){
    Route::get('/login', [Login::class, 'index'])->name('authentication.login.index');
    Route::get('/spaceowner/login', [Login::class, 'index_space_owner'])->name('authentication.spaceowner.login.index');
    Route::post('/login', [Login::class, 'login'])->name('authentication.login.authenticate');
    Route::post('/verify',[Signup::class,'send_email'])->name('authentication.email.verification');
    Route::post('/code',[Signup::class,'verify_code'])->name('authentication.email.code');
    Route::get('/signup', [Signup::class, 'index'])->name('authentication.signup.index');
    Route::get('spaceowner/signup', [Signup::class, 'index_space_owner'])->name('authentication.spaceowner.signup.index');
    Route::post('/signup', [Signup::class, 'signup'])->name('authentication.signup.create.account');
    Route::get('/forgotpassword', [ForgotPassword::class, 'forgotpassword'])->name('authentication.forgotpassword');
    // oauth

    Route::get('/auth/facebook/redirect', function () {
        return Socialite::driver('facebook')->redirect();
    });
     
    Route::get('/auth/facebook/callback', function () {
        $user = Socialite::driver('facebook')->user();
        dd($user);
    });
    
    Route::get('/auth/google/redirect', function () {
        return Socialite::driver('google')->redirect();
    });
     
    Route::get('/auth/google/callback',[OAuthController::class,'google'])->name('authentication.oauth.google');
    
});


Route::middleware([IsAuthenticated::class])->group(function () {
    Route::get('files/vehicle/back_side_picture/{filename}', [FileController::class, 'back_side_picture']);
    Route::get('files/vehicle/cr_picture/{filename}', [FileController::class, 'cr_picture']);
    Route::get('files/vehicle/front_side_picture/{filename}', [FileController::class, 'front_side_picture']);
    Route::get('files/vehicle/left_side_picture/{filename}', [FileController::class, 'left_side_picture']);
    Route::get('files/vehicle/or_picture/{filename}', [FileController::class, 'or_picture']);
    Route::get('files/license/pictureholdinglicense/{filename}', [FileController::class, 'picture_holding_license']);
    Route::get('files/license/pictureoflicense/{filename}', [FileController::class, 'picture_of_license']);
    Route::get('files/profile/{filename}', [FileController::class, 'profile_picture']);
    Route::get('files/vehicle/right_side_picture/{filename}', [FileController::class, 'right_side_picture']);
    Route::get('files/space_content/{filename}', [FileController::class, 'space_picture']);
    
});
Route::middleware([])->group(function () {
    Route::get('files/vehicle-type/{filename}', [FileController::class, 'vehicle_type']);
});


Route::middleware([IsAuthenticated::class])->group(function () {
    Route::get('/logout', [Logout::class, 'index'])->name('authentication.logout.index');
    Route::post('/profile/update', [RenterProfile::class, 'store'])->name('renter.profile.store');
    Route::post('/password/update', [RenterProfile::class, 'change_password'])->name('renter.profile.change.password');
    Route::post('/password/update/new', [RenterProfile::class, 'new_change_password'])->name('renter.profile.new_change.password');
    Route::post('/profile/update/image', [RenterProfile::class, 'update_image'])->name('renter.profile.update.image');

});
// authenticated
// renter
Route::middleware([IsAuthenticated::class,IsRenter::class])->group(function () {
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
        Route::prefix('license')->group(function () {
            Route::get('/', [RenterLicense::class, 'index'])->name('renter.license.index');
            Route::post('/update', [RenterLicense::class, 'store'])->name('renter.store.license');
        });
        Route::prefix('registration')->group(function () {
            Route::get('/', [RenterRegistration::class, 'index'])->name('renter.registration.index');
        });
        Route::prefix('vehicles')->group(function () {
            Route::get('/', [RenterVehicles::class, 'index'])->name('renter.vehicles.index');
            Route::post('/update', [RenterVehicles::class, 'store'])->name('renter.store.vehicle');
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
Route::middleware([IsAuthenticated::class,IsSpaceOwner::class])->group(function () {
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
            Route::post('/all', [SpaceOwnerSpaces::class, 'all'])->name('spaceowner.spaces.all');
            Route::get('/view/{id}', [SpaceOwnerSpaces::class, 'view'])->name('spaceowner.spaces.view');
            Route::get('/edit/{id}', [SpaceOwnerSpaces::class, 'edit'])->name('spaceowner.spaces.edit');
            Route::get('/add', [SpaceOwnerSpaces::class, 'add_index'])->name('spaceowner.spaces.add.index');
            Route::post('/add', [SpaceOwnerSpaces::class, 'add_space'])->name('spaceowner.spaces.add');
            Route::post('/delete', [SpaceOwnerSpaces::class, 'delete'])->name('spaceowner.spaces.delete');

            Route::post('/save_location',[SpaceOwnerSpaces::class, 'save_location']);
            Route::prefix('content')->group(function () {
                Route::post('/delete', [SpaceOwnerSpaces::class, 'delete_content'])->name('spaceowner.spaces.delete_content');
                Route::post('/add',[SpaceOwnerSpaces::class, 'add_content'])->name('spaceowner.spaces.add_content');
                Route::get('/all/{space_id}', [SpaceOwnerSpaces::class, 'all_content'])->name('spaceowner.spaces.content.index');
            });
            Route::prefix('allotments')->group(function () {
                Route::get('/all/{space_id}', [SpaceOwnerSpaces::class, 'all_allotments'])->name('spaceowner.spaces.allotments.index');
            }); 
        });
        Route::prefix('wallet')->group(function () {
            Route::get('/', [SpaceOwnerWallet::class, 'index'])->name('spaceowner.wallet.index');
        });
    });
});


// super admin
Route::middleware([IsAuthenticated::class,IsAdmin::class])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/', [AdminDashboard::class, 'index'])->name('admin.default.index');
        Route::prefix('dashboard')->group(function () {
            Route::get('/', [AdminDashboard::class, 'index'])->name('admin.dashboard.index');
        });
        
        Route::prefix('spaces')->group(function () {
            Route::get('/', [AdminSpaces::class, 'index'])->name('admin.spaces.index');
        }); 
        Route::prefix('licenses')->group(function () {
            Route::get('/', [AdminLicenses::class, 'index'])->name('admin.licenses.index');
        }); 
        Route::prefix('vehicles')->group(function () {
            Route::get('/', [AdminVehicles::class, 'index'])->name('admin.vehicles.index');
        }); 
        Route::prefix('vehicle-types')->group(function () {
            Route::get('/', [AdminVehicleTypes::class, 'index'])->name('admin.vehicle-types.index');
            Route::post('/all', [AdminVehicleTypes::class, 'all'])->name('admin.vehicle-types.all');
            Route::post('/add', [AdminVehicleTypes::class, 'add'])->name('admin.vehicle-types.add');
            Route::post('/delete', [AdminVehicleTypes::class, 'delete'])->name('admin.vehicle-types.delete');
            Route::post('/edit', [AdminVehicleTypes::class, 'edit'])->name('admin.vehicle-types.edit');
            Route::post('/toggle_is_active', [AdminVehicleTypes::class, 'toggle_is_active'])->name('admin.vehicle-types.toggle_is_active');
            Route::get('/view/{id}', [AdminVehicleTypes::class, 'view'])->name('admin.vehicle-types.view');
        }); 
        Route::prefix('users')->group(function () {
            Route::get('/', [AdminUsers::class, 'index'])->name('admin.users.index');
            Route::post('/all', [AdminUsers::class, 'all'])->name(name: 'admin.users.all');
            Route::post('/toggle_is_active', [AdminUsers::class, 'toggle_is_active'])->name('admin.users.toggle_is_active');
            Route::get('/view/{id}', [AdminUsers::class, 'view'])->name('admin.users.view');
        }); 
        Route::prefix('wallet')->group(function () {
            Route::get('/', [AdminWallet::class, 'index'])->name('admin.wallet.index');
        }); 
        Route::prefix('profile')->group(function () {
            Route::get('/', [AdminProfile::class, 'index'])->name('admin.profile.index');
        }); 
        
    });
});
Route::get('/temp',function (){ return view("home");});


Route::middleware([IsAuthenticated::class])->group(function () {
    Route::get('search/{table}/{column}/{sort_by}/{limit}/{value}',[SearchAPI::class,'search'])->name("search");
    Route::get('search/{table}/{column}/{sort_by}/{limit}',[SearchAPI::class,'search_default'])->name("search_default");
});

