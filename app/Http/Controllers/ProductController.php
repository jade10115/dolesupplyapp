<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
    $products = Product::all();
    return response()->json($products);
        
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_name' => 'required|string|max:255', // Validation rule for item_name
            'description' => 'required|string|max:255',  // Validation rule for category
            'price' => 'required|numeric',             // Validation rule for price
            'description' => 'nullable|string',        // Validation rule for description
            'qty' => 'nullable|integer',               // Validation rule for qty
            'unit_of_measurement' => 'nullable|string', // Validation rule for unit_of_measurement
        ]);
    
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(null, 204);
    }
}
