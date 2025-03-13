<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingsController extends Controller
{
   
    


    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required',
            'id_room' => 'required|exists:rooms,id',
            'checkin' => 'required|date',
            'checkout' => 'required|date|after:checkin',
            'total_price' => 'required|required',
            'status' => 'required|string'
        ]);

        $booking = Bookings::create($request->all());

        return response()->json([
            'message' => 'Booking created successfully!',
            'booking' => $booking,
        ], 201);
    }

   
    public function index()
    {
        $bookings = Bookings::with(['user', 'room'])->get();

        return response()->json($bookings);
    }

   
    public function show($id)
    {
        $booking = Bookings::with(['user', 'room'])->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json($booking);
    }
 

    public function update(Request $request, $id)
    {
        $booking = Bookings::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $request->validate([
            'id_user' => 'sometimes|exists:users,id',
            'id_room' => 'sometimes|exists:rooms,id',
            'checkin' => 'sometimes|date',
            'checkout' => 'sometimes|date|after:checkin',
        ]);

        $booking->update($request->all());

        return response()->json([
            'message' => 'Booking updated successfully!',
            'booking' => $booking,
        ]);
    }

     
    public function destroy($id)
    {
        $booking = Bookings::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully!']);
    }



}
