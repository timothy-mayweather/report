<?php

namespace App\Http\Controllers;

use App\Models\EmploymentRole;
use App\Models\ShareRule;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class UserController extends Controller
{
	public function create(Request $request): Response
	{
        $roleId = $request->input('role');
        $shareRules = ShareRule::where("employment_role_id", $roleId)->get();
        $users = [];
        foreach ($shareRules as $rule){
             $users = [...$users, ...DB::select("select employment_role_id, u.id, u.name, u.email from user_roles inner join users u on u.id = user_roles.user_id where employment_role_id=?;",[$rule->shared_role])];
        }
		return Response(["users"=>$users, "rules"=>$shareRules, "roles"=>EmploymentRole::all()]);
	}

	public function index(): \Inertia\Response | RedirectResponse
	{
		$users = User::withTrashed()->get();
		foreach ($users as $user){
			$user->employmentRoles = $user->employmentRoles()->get(["employment_role_id as id"]);
		}
		return Inertia::render('Users/Index',['users'=>$users, 'roles'=>EmploymentRole::all()]);
	}

	public function update(Request $request, User $user):Response
	{
		if($request->input('employmentRoles')!==null){
			$employmentRoles = json_decode($request->input('employmentRoles'));
			$currentRoles = $user->employmentRoles()->selectRaw("employment_role_id as id, id as old_id")->get();

			$rolesToDelete = [];
			foreach ($currentRoles as $currentRole){
				if(in_array($currentRole->id, $employmentRoles)){
					unset($employmentRoles[array_search($currentRole->id, $employmentRoles)]);
				}else{
					$rolesToDelete[] = $currentRole->old_id;
				}
			}

			if(count($rolesToDelete)>0){
				UserRole::destroy($rolesToDelete);
			}
			foreach ($employmentRoles as $employmentRole){
				UserRole::create([
					'user_id' => $user->id,
					'employment_role_id' => $employmentRole,
					'user_role' => $user->id.'_'.$employmentRole,
				]);
			}
		}

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
		$user->employmentRoles = $user->employmentRoles()->get(["employment_role_id as id"]);
		return Response($user);
	}


}
