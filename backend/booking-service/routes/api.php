<?php

use App\Http\Controllers\BookingsController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/admin/add-room', [RoomController::class, 'addRoom']);



// Route::post('/admin/user-management', [AdminController::class, 'addEmployer']);

// Route::get('/admin/user-management/all-employers', [AdminController::class, 'getAllEmployer']);
 
// Route::post('/respsioniste/add-guest', [ReceptionistController::class, 'registerGuest']);
// Route::get('/respsioniste/all-guest', [ReceptionistController::class, 'getAllGuests']);

// Route::post('/respsioniste/booking-guest', [ReceptionistController::class, 'addBooking']);
// Route::get('/respsioniste/choose-room/{id}', [ReceptionistController::class, 'show']);



Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/room/{id}', [RoomController::class, 'show']);

Route::prefix('bookings')->group(function () {
    Route::post('/', [BookingsController::class, 'store']); 
    Route::get('/', [BookingsController::class, 'index']);  
    Route::get('/{id}', [BookingsController::class, 'show']);  
    Route::put('/{id}', [BookingsController::class, 'update']);  
    Route::delete('/{id}', [BookingsController::class, 'destroy']);  
});