<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    // public function index(Request $request)
    // {

    //     $user = $request->user();
    //     return response()->json($user);
        

      
    // }

    public function index(Request $request)
{
   
        if (Auth::user()) {
            $user = $request->user();
            return response()->json(Auth::user()->id);
        }
     

    
}

  
}
