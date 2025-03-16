<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Pusher\Pusher;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'text' => 'required|string',
        ]);

        // Create message in DB
        $user = $request->user; 

        $message = Message::create([
            'sender_id' => $user['id'],
            'receiver_id' => $request->receiver_id,
            'text' => $user['email'],
        ]);

        // Send real-time event using Pusher
        $this->sendToPusher($message);

        return response()->json($message, 201);
    }

    public function getMessages($sender_id, $receiver_id)
    {
        $messages = Message::where(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $sender_id)
                ->where('receiver_id', $receiver_id);
        })->orWhere(function ($query) use ($sender_id, $receiver_id) {
            $query->where('sender_id', $receiver_id)
                ->where('receiver_id', $sender_id);
        })->orderBy('created_at', 'asc')->get();

        return response()->json($messages);
    }

    private function sendToPusher($message)
    {
        $pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true
            ]
        );

        $pusher->trigger('chat-channel', 'new-message', $message);
    }
}
