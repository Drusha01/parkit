<?php

use Laravel\Socialite\Facades\Socialite;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Pages\WebPages;

use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WebhookController;

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
use App\Http\Controllers\Renter\RegistrationV2 as RenterRegistrationV2;
use App\Http\Controllers\Renter\Scanner as RenterScanner;
use App\Http\Controllers\Renter\RequestTopUp as RenterRequestTopUp;

// space owner
use App\Http\Controllers\SpaceOwner\Dashboard as SpaceOwnerDashboard;
use App\Http\Controllers\SpaceOwner\Feedback as SpaceOwnerFeedback;
use App\Http\Controllers\SpaceOwner\HelpAndSupport as SpaceOwnerHelpAndSupport;
use App\Http\Controllers\SpaceOwner\History as SpaceOwnerHistory;
use App\Http\Controllers\SpaceOwner\Notification as SpaceOwnerNotification;
use App\Http\Controllers\SpaceOwner\Profile as SpaceOwnerProfile;
use App\Http\Controllers\SpaceOwner\Scanner as SpaceOwnerScanner;
use App\Http\Controllers\SpaceOwner\Spaces as SpaceOwnerSpaces;
use App\Http\Controllers\SpaceOwner\Wallet as SpaceOwnerWallet;

// admin
use App\Http\Controllers\Admin\Commission as AdminCommission;
use App\Http\Controllers\Admin\Dashboard as AdminDashboard;
use App\Http\Controllers\Admin\Licenses as AdminLicenses;
use App\Http\Controllers\Admin\Profile as AdminProfile;
use App\Http\Controllers\Admin\RenterController as AdminRenterController;
use App\Http\Controllers\Admin\SpaceOwnerController as AdminSpaceOwnerController;
use App\Http\Controllers\Admin\Staff as AdminStaff;
use App\Http\Controllers\Admin\Spaces as AdminSpaces;
use App\Http\Controllers\Admin\Users as AdminUsers;
use App\Http\Controllers\Admin\Vehicles as AdminVehicles;
use App\Http\Controllers\Admin\VehicleTypes as AdminVehicleTypes;
use App\Http\Controllers\Admin\Wallet as AdminWallet;
use App\Http\Controllers\Admin\Notifications as AdminNotifications;
use App\Http\Controllers\Admin\RequestTopUp as AdminRequestTopUp;


// extras
use App\Http\Controllers\Barangay;
use App\Http\Controllers\Cities;
use App\Http\Controllers\Province;
use App\Http\Controllers\Regions;

// middleware
use App\Http\Middleware\IsAdmin;
use App\Http\Middleware\IsAuthenticated;
use App\Http\Middleware\IsRenter;
use App\Http\Middleware\IsSpaceOwner;
use App\Http\Middleware\IsUnauthenticated;
use App\Http\Middleware\IsValid;


Route::get('/', [WebPages::class, 'homepage'])->name('page.homepage');
Route::get('/browse', [WebPages::class, 'browse'])->name('page.browse');
Route::get('/go/{id}', [WebPages::class, 'go'])->name('page.go');
Route::get('/howitworks', [WebPages::class, 'howitworks'])->name('page.howitworks');
Route::get('/whyparkit', [WebPages::class, 'whyparkit'])->name('page.whyparkit');
Route::get('/aboutus', [WebPages::class, 'aboutus'])->name('page.aboutus');
Route::get('/driverfaq', [WebPages::class, 'driverfaq'])->name('page.driverfaq');
Route::get('/privacypolicy', [WebPages::class, 'privacypolicy'])->name('page.privacypolicy');
Route::post('/spaces/all', [WebPages::class, 'spaces'])->name('page.spaces');
Route::get('/spaces/view/{id}', [WebPages::class, 'view_space'])->name('page.view-spaces');


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


Route::middleware([])->group(function () {
    Route::get('files/vehicle/back_side_picture/{filename}', [FileController::class, 'back_side_picture']);
    Route::get('files/vehicle/cor_picture/{filename}', [FileController::class, 'cor_picture']);
    Route::get('files/vehicle/front_side_picture/{filename}', [FileController::class, 'front_side_picture']);
    Route::get('files/vehicle/left_side_picture/{filename}', [FileController::class, 'left_side_picture']);
    Route::get('files/vehicle/or_picture/{filename}', [FileController::class, 'or_picture']);
    Route::get('files/license/pictureholdinglicense/{filename}', [FileController::class, 'picture_holding_license']);
    Route::get('files/license/pictureoflicense/{filename}', [FileController::class, 'picture_of_license']);
    Route::get('files/profile/{filename}', [FileController::class, 'profile_picture']);
    Route::get('files/vehicle/right_side_picture/{filename}', [FileController::class, 'right_side_picture']);
    Route::get('files/space_content/{filename}', [FileController::class, 'space_picture']);
    Route::get('files/reference_photo/{filename}', [FileController::class, 'reference_photo']);
    
    
});
Route::middleware([])->group(function () {
    Route::get('files/vehicle-type/{filename}', [FileController::class, 'vehicle_type']);
});

// authenticated
Route::middleware([IsAuthenticated::class])->group(function () {
    Route::get('/logout', [Logout::class, 'index'])->name('authentication.logout.index');
    Route::post('/profile/update', [RenterProfile::class, 'store'])->name('renter.profile.store');
    Route::post('/password/update', [RenterProfile::class, 'change_password'])->name('renter.profile.change.password');
    Route::post('/password/update/new', [RenterProfile::class, 'new_change_password'])->name('renter.profile.new_change.password');
    Route::post('/profile/update/image', [RenterProfile::class, 'update_image'])->name('renter.profile.update.image');

    Route::post('/provinces/all',[Province::class,'all'])->name(name: 'provinces.all');
    Route::post('/regions/all',[Regions::class,'all'])->name(name: 'regions.all');
    Route::post('/cities/all',[Cities::class,'all'])->name(name: 'cities.all');
    Route::post('/barangays/all',[Regions::class,'all'])->name(name: 'barangay.all');

});

// renter
Route::middleware([IsAuthenticated::class,IsRenter::class])->group(function () {
    Route::prefix('renter')->group(function () {
        Route::get('/', [RenterDashboard::class, 'index'])->name('renter.default.index');
        Route::prefix('browse')->group(function () {
            Route::get('/', [RenterBrowse::class, 'index'])->name('renter.browse.index');
        });
        Route::prefix('scan')->group(function () {
            Route::get('/', [RenterScanner::class, 'index'])->name('renter.scan.index');
            Route::post('/hash', [RenterScanner::class, 'scan'])->name('renter.hash.index');
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
            Route::post('/all', [RenterHistory::class, 'all'])->name('renter.history.all');
            Route::get('/view/{id}', [RenterHistory::class, 'view'])->name('renter.history.view');
            Route::post('/rate', [RenterHistory::class, 'rate'])->name('renter.history.rate');
        });
        Route::prefix('profile')->group(function () {
            Route::get('/', [RenterProfile::class, 'index'])->name('renter.profile.index');
        });
        Route::prefix('license')->group(function () {
            Route::get('/', [RenterLicense::class, 'index'])->name('renter.license.index');
            Route::post('/update', [RenterLicense::class, 'store'])->name('renter.store.license');
            Route::get('/mylicense', [RenterLicense::class, 'my_license'])->name('renter.license.mylicense');
        });
        Route::prefix('registration')->group(function () {
            Route::get('/', [RenterRegistrationV2::class, 'index'])->name('renter.registration.index');
        });
        Route::prefix('vehicles')->group(function () {
            Route::get('/', [RenterVehicles::class, 'index'])->name('renter.vehicles.index');
            Route::get('/view/{id}', [RenterVehicles::class, 'view'])->name('renter.view.vehicle');
            Route::get('/qr/{id}', [RenterVehicles::class, 'qr'])->name('renter.qr.vehicle');
            Route::post('/add', [RenterVehicles::class, 'add'])->name('renter.add.vehicle');
            Route::post('/edit', [RenterVehicles::class, 'edit'])->name('renter.edit.vehicle');
            Route::post('/delete', [RenterVehicles::class, 'delete'])->name('renter.delete.vehicle');
            Route::post('/all', [RenterVehicles::class, 'all'])->name('renter.all.vehicle');
            Route::post('/update', [RenterVehicles::class, 'store'])->name('renter.store.vehicle');
            Route::post('/default', [RenterVehicles::class, 'default'])->name('renter.default.vehicle');
            Route::get('/default', [RenterVehicles::class, 'get_default'])->name('renter.getdefault.vehicle');
        });
        Route::prefix('wallet')->group(callback: function () {
            Route::get('/', [RenterWallet::class, 'index'])->name('renter.wallet.index');
            Route::post('/all', [RenterWallet::class, 'all'])->name('renter.wallet.all');
            
        });
        Route::prefix('privacy')->group(callback: function () {
            Route::get('/', [RenterPrivacy::class, 'index'])->name('renter.privacy.index');
        });
        Route::prefix('top-ups')->group(callback: function () {
            Route::get('/', [RenterRequestTopUp::class, 'index'])->name('renter.topup.index');
            Route::post('/all', [RenterRequestTopUp::class, 'all'])->name('renter.topup.all');
            Route::post('/add', [RenterRequestTopUp::class, 'add'])->name('renter.topup.add');
            Route::post('/edit', [RenterRequestTopUp::class, 'edit'])->name('renter.topup.edit');
            Route::post('/delete', [RenterRequestTopUp::class, 'delete'])->name('renter.topup.delete');
            Route::get('/view/{id}', [RenterRequestTopUp::class, 'view'])->name('renter.topup.view');

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
            Route::post('/all', [SpaceOwnerFeedback::class, 'all'])->name('spaceowner.feedback.all');
            Route::get('/view/{id}', [SpaceOwnerFeedback::class, 'view'])->name('spaceowner.feedback.view');
        });
        Route::prefix('helpandsupport')->group(function () {
            Route::get('/', [SpaceOwnerHelpAndSupport::class, 'index'])->name('spaceowner.helpandsupport.index');
        });
        Route::prefix('history')->group(function () {
            Route::get('/', [SpaceOwnerHistory::class, 'index'])->name('spaceowner.history.index');
            Route::post('/all', [SpaceOwnerHistory::class, 'all'])->name('spaceowner.history.all');
            Route::get('/view/{id}', [SpaceOwnerHistory::class, 'view'])->name('spaceowner.history.view');
        });
        Route::prefix('notifications')->group(function () {
            Route::get('/', [SpaceOwnerNotification::class, 'index'])->name('spaceowner.notifications.index');
            Route::post('/all', [SpaceOwnerNotification::class, 'all'])->name('spaceowner.notifications.all');
            Route::post('/toggle', [SpaceOwnerNotification::class, 'toggle'])->name('spaceowner.notifications.toggle');
        });
        Route::prefix('profile')->group(function () {
            Route::get('/', [SpaceOwnerProfile::class, 'index'])->name('spaceowner.profile.index');
        });
        Route::prefix('spaces')->group(function () {
            Route::get('/', [SpaceOwnerSpaces::class, 'index'])->name('spaceowner.spaces.index');
            Route::post('/all', [SpaceOwnerSpaces::class, 'all'])->name('spaceowner.spaces.all');
            Route::get('/view/{id}', [SpaceOwnerSpaces::class, 'view'])->name('spaceowner.spaces.view');
            Route::get('/qr/{id}', [SpaceOwnerSpaces::class, 'qr'])->name('spaceowner.qr.space');
            Route::get('/edit/{id}', [SpaceOwnerSpaces::class, 'edit'])->name('spaceowner.spaces.edit');
            Route::post('/edit', [SpaceOwnerSpaces::class, 'save_space'])->name('spaceowner.spaces.save-edit');
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
                Route::get('/view/{id}', [SpaceOwnerSpaces::class, 'view_allotment'])->name('spaceowner.spaces.allotments.view');
                Route::post('add',[SpaceOwnerSpaces::class,'add_vehicle_allotments'])->name('spaceowner.spaces.allotments.add');
                Route::post('edit',[SpaceOwnerSpaces::class,'edit_vehicle_allotments'])->name('spaceowner.spaces.allotments.edit');
                Route::post('delete',[SpaceOwnerSpaces::class,'delete_vehicle_allotments'])->name('spaceowner.spaces.allotments.delete');
            }); 
        });
        Route::prefix('scan')->group(function () {
            Route::get('/', [SpaceOwnerScanner::class, 'index'])->name('spaceowner.scan.index');
            Route::post('/hash', [SpaceOwnerScanner::class, 'scan'])->name('spaceowner.hash.index');
        });
        Route::prefix('wallet')->group(function () {
            Route::get('/', [SpaceOwnerWallet::class, 'index'])->name('spaceowner.wallet.index');
            Route::post('/all', [SpaceOwnerWallet::class, 'all'])->name('spaceowner.wallet.all');
     
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
            Route::post('/all', [AdminSpaces::class, 'all'])->name('admin.spaces.all');
            Route::get('/view/{id}', [AdminSpaces::class, 'view'])->name('admin.spaces.view');
            Route::post('/modify_status', [AdminSpaces::class, 'modify_status'])->name('admin.spaces.modify_status');
        }); 
        Route::prefix('licenses')->group(function () {
            Route::get('/', [AdminLicenses::class, 'index'])->name('admin.licenses.index');
            Route::post('/all', [AdminLicenses::class, 'all'])->name('admin.licenses.all');
            Route::get('/view/{id}', [AdminLicenses::class, 'view'])->name('admin.licenses.view');
            Route::post('/toggle_is_active', [AdminLicenses::class, 'toggle_is_active'])->name('admin.licenses.toggle_is_active');
        }); 
        Route::prefix('vehicles')->group(function () {
            Route::get('/', [AdminVehicles::class, 'index'])->name('admin.vehicles.index');
            Route::post('/all', [AdminVehicles::class, 'all'])->name('admin.vehicles.all');
            Route::get('/view/{id}', [AdminVehicles::class, 'view'])->name('admin.vehicles.view');
            Route::post('/modify_status', [AdminVehicles::class, 'modify_status'])->name('admin.vehicles.modify_status');
            
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
        Route::prefix('staffs')->group(function () {
            Route::get('/', [AdminStaff::class, 'index'])->name('admin.staffs.index');
            Route::post('/all', [AdminStaff::class, 'all'])->name(name: 'admin.staffs.all');
            Route::post('/toggle_is_active', [AdminStaff::class, 'toggle_is_active'])->name('admin.staffs.toggle_is_active');
            Route::get('/view/{id}', [AdminStaff::class, 'view'])->name('admin.staffs.view');
            Route::post('/add', [AdminStaff::class, 'add'])->name('admin.staffs.add');
            Route::post('/edit', [AdminStaff::class, 'edit'])->name('admin.staffs.edit');
        }); 
        Route::prefix('wallet')->group(function () {
            Route::get('/', [AdminWallet::class, 'index'])->name('admin.wallet.index');
            Route::post('/all', [AdminWallet::class, 'all'])->name('admin.wallet.all');
            Route::get('/view/{id}', [AdminWallet::class, 'view'])->name('admin.wallet.view');
            Route::post('/topup', [AdminWallet::class, 'topup'])->name('admin.topup.person');
            
        }); 
        Route::prefix('commission')->group(function () {
            Route::get('/', [AdminCommission::class, 'index'])->name('admin.commission.index');
            Route::post('/all', [AdminCommission::class, 'all'])->name('admin.commission.all');
        }); 
        Route::prefix('profile')->group(function () {
            Route::get('/', [AdminProfile::class, 'index'])->name('admin.profile.index');
        }); 
        Route::prefix('notifications')->group(function () {
            Route::get('/', [AdminNotifications::class, 'index'])->name('admin.notifications.index');
            Route::post('/all', [AdminNotifications::class, 'all'])->name('admin.notifications.all');
            Route::post('/toggle', [AdminNotifications::class, 'toggle'])->name('admin.notifications.toggle');
        });
        Route::prefix('top-ups')->group(callback: function () {
            Route::get('/', [AdminRequestTopUp::class, 'index'])->name('admin.topup.index');
            Route::post('/all', [AdminRequestTopUp::class, 'all'])->name('admin.topup.all');
            Route::post('/edit', [AdminRequestTopUp::class, 'edit'])->name('admin.topup.edit');
            Route::get('/view/{id}', [AdminRequestTopUp::class, 'view'])->name('admin.topup.view');

        });
    });
});
Route::get('/temp',function (){ return view("home");});


Route::middleware([IsAuthenticated::class])->group(function () {
    Route::get('search/{table}/{column}/{sort_by}/{limit}/{value}',[SearchAPI::class,'search'])->name("search");
    Route::get('search/{table}/{column}/{sort_by}/{limit}',[SearchAPI::class,'search_default'])->name("search_default");
});


Route::post('/xendit/webhook', [WebhookController::class, 'handleWebhook']);
Route::post('/xendit/payment', [PaymentController::class, 'createInvoice']);


