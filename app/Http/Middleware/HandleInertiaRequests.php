<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
	/**
	 * The root template that is loaded on the first page visit.
	 *
	 * @var string
	 */
	protected $rootView = 'app';

	/**
	 * Determine the current asset version.
	 */
	public function version(Request $request): string|null
	{
		return parent::version($request);
	}

	/**
	 * Define the props that are shared by default.
	 *
	 * @return array<string, mixed>
	 */
	public function share(Request $request): array
	{
		$currentUser = $request->user();
		if($currentUser!==null){
			$user = [
				...$currentUser->toArray(),
				'employmentRoles'=>$request->session()->get('employmentRoles'),
				'isAdminRoute'=>in_array('admin',$request->route()->middleware(),true),
				'isAdmin'=>$currentUser->isAdmin()
			];
		}else{
			$user = null;
		}

		return array_merge(parent::share($request), [
			'auth' => [
				'user' => $user,
			],
			'ziggy' => function () use ($request) {
				return array_merge((new Ziggy)->toArray(), [
					'location' => $request->url(),
				]);
			},
			'flash' => function () use ($request) {
				return [
					'success' => $request->session()->get('success'),
				];
			},
		]);
	}
}
