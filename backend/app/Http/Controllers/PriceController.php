<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Price;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Vote;

class PriceController extends Controller
{
    public function products(): JsonResponse
    {
        return response()->json(
            Product::query()
                ->orderBy('name')
                ->get(['id', 'name', 'category', 'brand'])
        );
    }

    public function locations(): JsonResponse
    {
        return response()->json(
            Location::query()
                ->orderBy('city')
                ->orderBy('area')
                ->get(['id', 'city', 'area'])
        );
    }

    public function index(Request $request): JsonResponse
    {
        $query = Price::query()
            ->with([
                'product:id,name,category,brand',
                'location:id,city,area',
            ])
            ->latest();

        if ($request->filled('product_id')) {
            $query->where('product_id', $request->integer('product_id'));
        }

        if ($request->filled('location_id')) {
            $query->where('location_id', $request->integer('location_id'));
        }

        return response()->json(
            $query->limit(100)->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'brand' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'area' => ['nullable', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'gt:0'],
            'currency' => ['required', 'string', 'max:8'],
        ]);

        $price = DB::transaction(function () use ($validated, $request) {
            $product = Product::firstOrCreate(
                ['name' => trim($validated['product_name'])],
                [
                    'category' => $validated['category'] ?? null,
                    'brand' => $validated['brand'] ?? null,
                ]
            );

            $product->update([
                'category' => $validated['category'] ?? $product->category,
                'brand' => $validated['brand'] ?? $product->brand,
            ]);

            $location = Location::firstOrCreate([
                'city' => trim($validated['city']),
                'area' => !empty($validated['area'])
                    ? trim($validated['area'])
                    : null,
            ]);

            return Price::create([
                'product_id' => $product->id,
                'submitter_id' => $request->user()?->id,
                'location_id' => $location->id,
                'amount' => $validated['amount'],
                'currency' => strtoupper($validated['currency']),
                'status' => 'pending',
            ]);
        });

        $price->load([
            'product:id,name,category,brand',
            'location:id,city,area',
        ]);

        return response()->json($price, 201);
    }


    
    public function vote(Request $request, Price $price): JsonResponse
    {
        $validated = $request->validate([
            'vote_type' => ['required', 'string', 'in:up,down,flag'],
        ]);

        $vote = Vote::create([
            'price_id' => $price->id,
            'user_id' => $request->user()?->id,
            'vote_type' => $validated['vote_type'],
        ]);

        $counts = Vote::query()
            ->where('price_id', $price->id)
            ->selectRaw("
                SUM(CASE WHEN vote_type = 'up' THEN 1 ELSE 0 END) as up,
                SUM(CASE WHEN vote_type = 'down' THEN 1 ELSE 0 END) as down,
                SUM(CASE WHEN vote_type = 'flag' THEN 1 ELSE 0 END) as flag
            ")
            ->first();

        return response()->json([
            'vote_id' => $vote->id,
            'price_id' => $price->id,
            'up' => (int) ($counts->up ?? 0),
            'down' => (int) ($counts->down ?? 0),
            'flag' => (int) ($counts->flag ?? 0),
        ], 201);
    }
}
