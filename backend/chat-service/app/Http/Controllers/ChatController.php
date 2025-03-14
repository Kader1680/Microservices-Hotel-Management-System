<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
//     // public function index(Request $request)
//     // {

//     //     $user = $request->user();
//     //     return response()->json($user);
        

      
//     // }

//     public function index(Request $request)
// {
   
//         if (Auth::user()) {
//             $user = $request->user();
//             return response()->json(Auth::user()->id);
//         }
     

    
// }




    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = Chat::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'text' => $request->message,
        ]);

        return response()->json($message, 201);
    }

    public function getMessages($receiver_id)
    {
        $messages = Chat::where(function ($query) use ($receiver_id) {
            $query->where('sender_id', auth()->id())
                  ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($receiver_id) {
            $query->where('sender_id', $receiver_id)
                  ->where('receiver_id', auth()->id());
        })->orderBy('created_at')->get();

        return response()->json($messages);
    }
  
}
