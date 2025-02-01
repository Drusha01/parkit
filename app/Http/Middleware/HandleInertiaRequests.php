<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\DB;
use App\Models\Visitor;
use Carbon\Carbon;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $data = $request->session()->all();
        $ip = $request->ip();
        $today = Carbon::today()->toDateString();
        $userAgent = $request->header('User-Agent');

        // Check if this IP has already been logged today
        if (!Visitor::where('ip_address', $ip)->whereDate('visit_date', $today)->exists()) {
            Visitor::create([
                'ip_address' => $ip,
                'visit_date' => $today,
                'user_agent' => $userAgent,
            ]);
        }

        $user = [];
        $license = [];
        if(isset($data['user_id'])){
            $user = DB::table("users")
            ->select([
                'id' ,
                'user_login_type_id' ,
                'gender_id' ,
                'google_oauth_id' ,
                'facebook_oauth_id' ,
                'username' ,
                'is_admin' ,
                'is_space_owner' ,
                'first_name' ,
                'middle_name',
                'last_name' ,
                'suffix' ,
                'birthdate' ,
                'email' ,
                'email_verified' ,
                'mobile_number',
                'mobile_number_verified',
                'profile',
                'date_created',
                'date_updated' ,
            ])
            ->where("id",'=',$data['user_id'])
            ->first();
            $prefix = request()->route()->getPrefix();
            $firstPrefix = $prefix ? explode('/', trim($prefix, '/'))[0] : null;
            if($firstPrefix == 'renter'){
                $license =  $data = DB::table('licenses_v2')
                ->where('user_id', $data['user_id'])
                ->first();
            }
        }
        return array_merge(parent::share($request), [
            'auth'=>$user,
            'license'=>$license
        ]);
    }
}
