<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $report = ($request->has('reportId'))?Report::find($request->input('reportId')):['id'=>null, 'filename'=>'', 'fileType'=>''];
        return Inertia::render('Reports/Index',['report'=>$report]);
    }

    /**
     * Display a listing of the resource.
     */
    public function create(): \Illuminate\Http\Response
    {
        return Response(Report::with('user:id, name')->where('fileType','=', 'report')->get(['id','filename','fileType','created_at','updated_at']));
    }

	/**
	 * Display a listing of the resource.
	 */
		public function templates(): \Illuminate\Http\Response
		{
			return Response(Report::where('fileType','=', 'template')->get(['id','filename','fileType','created_at','updated_at']));
		}

		public function template(Report $report): \Illuminate\Http\Response
		{
			return Response($report);
		}

		public function edit(Report $report): RedirectResponse
    {
			return redirect()->back()->with(['report'=>$report]);
		}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\Response
    {
        $validated = $request->validate([
            'filename' => 'required|string',
            'content' => 'required|string',
            'fileType' => ['required','string', Rule::in(['report', 'template']),],
        ]);

        $report = $request->user()->reports()->create($validated);

        return Response($report);
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report): RedirectResponse
    {
	    return redirect()->back()->with($report);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report): \Illuminate\Http\Response
    {
        $validated = $request->validate([
	        'filename' => 'required|string',
	        'content' => 'required|string',
	        'fileType' => ['required','string', Rule::in(['report', 'template']),],
        ]);

        $report->update($validated);

        return Response($report);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Report $report): RedirectResponse
    {
        $report->delete();

        return redirect(route('reports.index'));
    }
}
