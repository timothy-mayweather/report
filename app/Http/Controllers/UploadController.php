<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;


class UploadController extends Controller
{
	public function index(): Response
	{
		return Response(Media::orderBy('id', 'DESC')->get());
	}


	public function store(Request $request): RedirectResponse
	{
		$request->validate([
			'file' => [
				'required',
				File::default()->max(5 * 1024),
			]
		]);

		$file = $request->file('file');
		$name = $file->hashName();

		Storage::put("public/uploads", $file);

		Media::query()->create(
			attributes: [
				'name' => "{$name}",
				'file_name' => $file->getClientOriginalName(),
				'mime_type' => $file->getClientMimeType(),
				'path' => "uploads/{$name}"
			],
		);

		return redirect()->back()->with('success',['urls'=>['default'=>$request->getUriForPath("/storage/uploads/$name")]]);
	}
}
