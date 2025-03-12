<?php

use App\Http\Controllers\auth_controller;
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



Route::post('/register', [auth_controller::class, 'register']);
Route::post('/login', [auth_controller::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [auth_controller::class, 'logout']);
    Route::get('/user', [auth_controller::class, 'user']);
});



Route::middleware('auth:sanctum')->get('/validate-token', function (Request $request) {
    return response()->json($request->user());
});


Route::post('/logout', [auth_controller::class, 'logout'])->middleware("auth:sanctum");




// Route::post('/select-payment', [PaymentController::class, 'store']);


// route::middleware('auth:sanctum', 'admin')->group(function (){
//     Route::get('/admin', [AdminController::class, 'index']);
// });


// Route::get('/receptionist', [ReceptionistController::class, 'index'])->middleware('role:receptionist');
// Route::get('/food-manager', [FoodManagerController::class, 'index'])->middleware('role:food_manager');

