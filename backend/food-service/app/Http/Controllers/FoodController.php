<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\Foods;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FoodController extends Controller
{
  
  public function index()
  {
      $foods = Foods::all();
      return response()->json([
            "message" =>'food get successfully',
            "foods" =>  $foods
      ], 200);
  }

 
  public function addFood(Request $request)
  {

    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|min:0',
        'image' => 'nullable',
    ]);

    if ($request->hasFile('image')) {
        $image = $request->file('image')->store('food_images', 'public');
        $validated['image'] = $image;
    }
 
    $food = Foods::create($validated);

    

    return response()->json([
        'message' => 'Food added successfully',
        'food' => $food,
    ], 201);


  }
 
  public function show($id)
  {
      $food = Foods::findOrFail($id);
      return response()->json($food);
  }

 
  public function update(Request $request, $id)
  {
      $validated = $request->validate([
          'name' => 'sometimes|string|max:255',
          'description' => 'sometimes|string',
          'price' => 'sometimes|numeric|min:0',
          'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      $food = Foods::findOrFail($id);

      if ($request->hasFile('image')) {
          if ($food->image) {
              Storage::disk('public')->delete($food->image);
          }
          $imagePath = $request->file('image')->store('food_images', 'public');
          $validated['image'] = $imagePath;
      }

      $food->update($validated);

      return response()->json([
          'message' => 'Food updated successfully',
          'food' => $food,
      ]);
  }

  public function destroy($id)
  {
      $food = Foods::findOrFail($id);

      if ($food->image) {
          Storage::disk('public')->delete($food->image);
      }

      $food->delete();

      return response()->json([
          'message' => 'Food deleted successfully',
      ], 204);
  }


 
  






}
