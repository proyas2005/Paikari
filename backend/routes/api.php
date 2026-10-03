<?php

use App\Http\Controllers\PriceController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [PriceController::class, 'products']);
Route::get('/locations', [PriceController::class, 'locations']);
Route::get('/prices', [PriceController::class, 'index']);
Route::post('/prices', [PriceController::class, 'store']);
Route::post('/prices/{price}/vote', [PriceController::class, 'vote']);
