<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    broadcast(new WebsocketDemoEvent('Init'));
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::get('/', [AuthenticatedSessionController::class, 'create']);
Route::get('/command', static function (Request $request){
    $output = "";
    if($request->has('command')){
        Artisan::call($request->input('command'));
        $output = Artisan::output();
    }
    return "<form method='get' action='/command'>command: <input type='text' name='command'/><input type='submit'></form><div>$output</div>";
});


Route::middleware(['auth', 'verified'])->group(function () {
    /** profile routes **/
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    /** end of profile routes **/
    Route::resource('upload', App\Http\Controllers\UploadController::class)->only(['index','store']);
    /** report routes **/
    Route::get('/reports/shared', [ReportController::class, 'createShared'])->name('reports.shared');
    Route::resource('reports', ReportController::class);
    Route::get('templates', [ReportController::class, 'templates']);
    Route::get('/template/{report}', [ReportController::class, 'template']);
    /** end of report routes **/

    /** admin routes */
    Route::middleware('admin')->group(function () {

        Route::resource('users', UserController::class)->only(['index','create', 'update'])->withTrashed(['update']);
        Route::resource('roles', RoleController::class)->only(['index','create', 'store', 'update','destroy']);

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('/reports/shared', [ReportController::class, 'createShared'])->name('reports.shared');
            Route::resource('reports', ReportController::class);
            Route::get('templates', [ReportController::class, 'templates'])->name('templates');
            Route::get('/template/{report}', [ReportController::class, 'template'])->name('template');
        });
    });
});

require __DIR__.'/auth.php';
