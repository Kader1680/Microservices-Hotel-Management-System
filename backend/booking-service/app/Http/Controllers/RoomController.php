<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller

{

    public function show($id)
    {
        $room = Room::find($id);
        if ($room){
            return response()->json(['room' => $room], 200);
        }
        return response()->json(['error' => 'Room not found'], 404);
    }

    

    public function index()
    {
        $rooms = Room::all();
        return response()->json([
            'message' => 'Room displayed successfully',
            'rooms' =>  $rooms
        ], 200);
    }


    public function addRoom(Request $request)
    {
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_occupation' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('rooms', 'public');
            $validated['image'] = $imagePath;
        }

        $room = Room::create($validated);

        return response()->json([
            'message' => 'Room added successfully',
            'room' => $room
        ], 201);
    }


    public function addEmployer(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4',
            'phone_number' => 'nullable|digits_between:2,15',
        ]);

        $employer = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'role' => $request->role,
            'email' => $request->email,
            'password' => hash::make($request->password),
            'phone_number' => $request->phone_number,
        ]);

        // Automatically log in the user after registration
        $token = $employer->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Employer added successfully',
            'token' => $token,
            'employer' => $employer,
        ], 201);
    }


    public function getAllEmployer()
    {
        $employers = User::all();

        return response()->json([
            'employers' => $employers
             
        ], 200);
    }


    // public function index(Request $request)
    // {
    //     return response()->json([
    //         'message' => 'welcome to admin dashboard',
             
    //     ], 200);
    // }

}
