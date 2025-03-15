<?php

use App\Http\Controllers\ChatController;
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

 
 
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/send-message', [ChatController::class, 'sendMessage']);
    Route::get('/messages/{sender_id}/{receiver_id}', [ChatController::class, 'getMessages']);
 });

 