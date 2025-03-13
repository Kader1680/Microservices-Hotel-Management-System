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

Route::post('/register', [auth_controller::class, 'register'])->name('register');
Route::post('/login', [auth_controller::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [auth_controller::class, 'logout'])->name('logout');
    Route::get('/user', [auth_controller::class, 'user'])->name('user');

});
 


// Route::post('/select-payment', [PaymentController::class, 'store']);


// route::middleware('auth:sanctum', 'admin')->group(function (){
//     Route::get('/admin', [AdminController::class, 'index']);
// });


// Route::get('/receptionist', [ReceptionistController::class, 'index'])->middleware('role:receptionist');
// Route::get('/food-manager', [FoodManagerController::class, 'index'])->middleware('role:food_manager');

