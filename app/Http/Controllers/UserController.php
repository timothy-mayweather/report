<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;


class UserController extends Controller
{
	public function create(): Response
	{
		return Response(User::whereIn('role', ["employee","supervisor"])->get(['id','name','email','role']));
	}

    public function index(Request $request): \Inertia\Response | RedirectResponse
    {
        return ($request->user()->isAdmin())?Inertia::render('Users/Index',['users'=>User::withTrashed()->get()]):redirect(RouteServiceProvider::HOME);
    }

    public function update(Request $request, User $user):Response
    {
        if($request->input('newRole')!==null){
            $user->role=$request->input('newRole');
            $user->save();
        }
        if($request->input('checked')){
            if($user->trashed()){
                $user->restore();
            }else{
                $user->delete();
            }
        }
        return Response($user);
    }


}
