<?php

namespace App\Http\Controllers;

use App\Models\EmploymentRole;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;


class RoleController extends Controller
{
    public function create(): Response
    {
        return Response(EmploymentRole::all());
    }

    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Roles/Index',['roles'=>EmploymentRole::all()]);
    }

    public function update(Request $request, EmploymentRole $role):Response
    {
        $validated = $request->validate([
            'name' => 'required|unique:employment_roles'
        ]);
        $role->update($validated);
        return Response($role);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|unique:employment_roles'
        ]);
        $role = EmploymentRole::create($validated);
        return Response($role);
    }
}
