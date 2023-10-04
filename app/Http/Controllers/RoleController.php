<?php

namespace App\Http\Controllers;

use App\Models\EmploymentRole;
use App\Models\ShareRule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Inertia\Inertia;


class RoleController extends Controller
{
    public function create(): Response
    {
			$roles = EmploymentRole::all();
			foreach ($roles as $role){
				$role->shareRules = $role->shareRules()->get();
			}
      return Response($roles);
    }

    public function index(): \Inertia\Response
    {
	    $roles = EmploymentRole::all();
	    foreach ($roles as $role){
		    $role->shareRules = $role->shareRules()->get();
	    }
      return Inertia::render('Roles/Index',['roles'=>$roles]);
    }

    public function update(Request $request, EmploymentRole $role):Response
    {
        $validated = $request->validate([
            'name' => ['required',Rule::unique('employment_roles')->ignore($role)],
	          'shareRules' => 'required|string'
        ]);
				$shareRules = json_decode($validated['shareRules'], true);
				if(count($shareRules)>0){
					foreach ($shareRules as $rule){
						if(!$rule['isShared']&&array_key_exists('shareId', $rule)){
							ShareRule::destroy($rule['shareId']);
						}else if($rule['isShared']){
							if(array_key_exists('shareId', $rule)) {
								$shareRule = ShareRule::find($rule['shareId']);
								$shareRule->edit = $rule['edit'];
								$shareRule->save();
							}else{
								ShareRule::create([
									'employment_role_id'=>$role->id,
									'shared_role'=>$rule['id'],
									'role_shared'=>$role->id.'_'.$rule['id'],
									'edit'=>$rule['edit']
								]);
							}
						}
					}
				}
				unset($validated['shareRules']);
        $role->update($validated);
	      $role->shareRules = $role->shareRules()->get();
        return Response($role);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => 'required|unique:employment_roles'
        ]);
        $role = EmploymentRole::create($validated);
	      $role->shareRules = $role->shareRules()->get();
        return Response($role);
    }

		public function destroy(EmploymentRole $role): Response
		{
			$role->delete();
			return Response("success");
		}
}
