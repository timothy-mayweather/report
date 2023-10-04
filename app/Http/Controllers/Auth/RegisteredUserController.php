<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'provisional',
						'employmentRoles' => '[1]',
            'password' => Hash::make($request->password),
        ]);

		    UserRole::create([
			    'user_id' => $user->id,
			    'employment_role_id' => 1,
			    'user_role' => $user->id.'_'.'1',
		    ]);

        event(new Registered($user));

//		    if($user->role=="provisional"){
//					return redirect('login')->with(['status'=>'Please wait for admin approval']);
//		    }

        Auth::login($user);
		    $request->session()->put('employmentRoles',DB::select("select employment_roles.id as id, employment_roles.name as name from user_roles right join employment_roles on user_roles.employment_role_id = employment_roles.id where user_id=".$user->id.";"));

	      return redirect(RouteServiceProvider::HOME);
    }
}
