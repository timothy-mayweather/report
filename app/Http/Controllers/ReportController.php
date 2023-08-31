<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\ReportViewer;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
		    $report = ($request->has('reportId')) ? Report::find($request->input('reportId'))?->toArray() ?? ['id' => null, 'filename' => '', 'fileType' => ''] : ['id' => null, 'filename' => '', 'fileType' => ''];
				if(!$request->user()->isAdmin() && $report['id']!==null) {
					if($report['user_id']!==$request->user()->id){
                        if(count($request->user()->reportViews()->where('report_id', $report['id'])->get()->toArray())==0) {
	                        $report = ['id' => null, 'filename' => '', 'fileType' => ''];
                        }
					}else{
                        $viewers = ReportViewer::where('report_id', $report['id'])->get(['user_id'])->toArray();
                        $viewerIds = [];
                        foreach ($viewers as $viewer){
                            $viewerIds[] = $viewer['user_id'];
                        }
                        $users = User::whereIn('id', $viewerIds)->get();
                        $report['users'] = $users;
                    }
				}
        return Inertia::render('Reports/Index',['report'=>$report]);
    }

    /**
     * Display a listing of the resource.
     */
    public function create(Request $request): \Illuminate\Http\Response
    {
        return Response(
					$request->user()->isAdmin()?
						Report::where('fileType','=', 'report')->latest()->limit(400)->get(['id','filename','fileType','created_at','updated_at']):
						$request->user()->reports()->where('fileType','=', 'report')->latest()->limit(400)->get(['id','filename','fileType','created_at','updated_at'])
        );
    }

	/**
	 * Display a listing of the resource.
	 */
	public function createShared(Request $request): \Illuminate\Http\Response
	{
        $sharedReports = $request->user()->reportViews()->get(['report_id'])->toArray();
		return Response(Report::whereIn('id',array_values($sharedReports))->latest()->limit(400)->get(['id','filename','fileType','created_at','updated_at']));
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
            'share' => 'required|string'
        ]);

        $sharedIds = $validated['share']==="0"?[]:explode(",", $validated['share']);
        unset($validated['share']);
        $report = $request->user()->reports()->create($validated)->toArray();
        if(count($sharedIds)>0){
            $views = [];
            foreach ($sharedIds as $sharedId){
                $views[] = [
	                'user_id' => $sharedId,
	                'report_id' => $report['id'],
	                'updated_at'=>date('Y-m-d H:i:s'),
	                'created_at'=>date('Y-m-d H:i:s'),
                ];
            }
            ReportViewer::insert($views);
        }

	    $viewers = ReportViewer::where('report_id', $report['id'])->get(['user_id'])->toArray();
	    $viewerIds = [];
	    foreach ($viewers as $viewer){
		    $viewerIds[] = $viewer['user_id'];
	    }
	    $users = User::whereIn('id', $viewerIds)->get();
	    $report['users'] = $users;

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
	        'share' => 'required|string'
        ]);

	    $sharedIds = $validated['share']==="0"?[]:explode(",", $validated['share']);
	    unset($validated['share']);
	    $report->update($validated);

	    $arr = $report->toArray();
	    $viewers = ReportViewer::where('report_id', $arr['id'])->get(['user_id'])->toArray();
	    $currentViewerIds = [];
	    foreach ($viewers as $viewer){
		    $currentViewerIds[] = $viewer['user_id'];
	    }


        $newSharedIds = [...$sharedIds];

			    $views = [];
			    foreach ($sharedIds as $sharedId){
            $index = array_search($sharedId, $currentViewerIds);
            if($index!==false){
                unset($currentViewerIds[$index]);
            }else {
	            $views[] = [
		            'user_id' => $sharedId,
		            'report_id' => $report['id'],
		            'updated_at' => date('Y-m-d H:i:s'),
		            'created_at' => date('Y-m-d H:i:s'),
	            ];
            }
			    }
            if(count($views)>0) {
	            ReportViewer::insert($views);
            }

            if(count($currentViewerIds)>0){
                $newViews = ReportViewer::where('report_id', $report->id)->get();

                foreach ($newViews as $newView){
	                $exists = in_array($newView->user_id, $currentViewerIds);
	                if($exists){
		                ReportViewer::find($newView->id)->delete();
	                }
                }
            }
			Log::info(implode("", $newSharedIds));
	    $users = count($newSharedIds)>0?User::whereIn('id', $newSharedIds)->get():[];
	    $arr['users'] = $users;

        return Response($arr);
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
