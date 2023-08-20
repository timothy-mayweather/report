<?php

namespace App\Http\Controllers;

use App\Events\WebsocketDemoEvent;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;


class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Reports/Index',[
            'reports' => Report::with('user:id, name')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'church' => 'required|string|max:255',
            'amount' => 'required|integer',
            'pledge' => 'required|integer',
            'contact' => 'required|string|max:255',
        ]);

        $request->user()->reports()->create($validated);
        $contributions = DB::select('select sum(amount) as cash, sum(pledge) as pledge, sum(amount+pledge) as totalAmount from reports;')[0];
        $people = DB::select('select * from reports order by id desc;');

        broadcast(new WebsocketDemoEvent(json_encode(['contributions'=>$contributions, 'people'=>$people])));
        return redirect(route('reports.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report): RedirectResponse
    {
        $this->authorize('update', $report);

        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $report->update($validated);

        return redirect(route('reports.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report): RedirectResponse
    {
        $this->authorize('delete', $report);

        $report->delete();

        return redirect(route('reports.index'));
    }
}
