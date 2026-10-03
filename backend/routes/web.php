<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/auth/csrf-token', fn () => response()->json(['token' => csrf_token()]));

Route::post('/auth/register', [AuthController::class, 'register']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])
    ->name('google.redirect');

Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])
    ->name('google.callback');

Route::get('/email/verify/{token}', [AuthController::class, 'verifyEmail'])
    ->name('verification.verify');


Route::get('/{any?}', function () {
    return response()->file(public_path('app/index.html'));
})->where('any', '(?!api/|up$).*');