<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class UserController extends Controller
{
	public function index(Request $request): Response
	{
		return Response(User::whereIn('role', ["employee","supervisor"])->get(['id','name','email','role']));
	}
}
