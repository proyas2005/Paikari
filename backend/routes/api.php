<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

use App\Http\Controllers\Api\TestController;

Route::get('/', function () {

    return response()->json([
        'message'=>'Paikari API is running'
    ]);

});


Route::post(
    '/register',
    [AuthController::class,'register']
);

Route::post(
    '/login',
    [AuthController::class, 'login']
);

Route::middleware(['jwt.auth'])->group(function () {

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );

    Route::get(
        '/me',
        [AuthController::class, 'me']
    );

});


Route::middleware([
    'jwt.auth',
    'role:user'
])->group(function () {

    Route::get(
        '/user-dashboard',
        [TestController::class, 'user']
    );

});


Route::middleware([
    'jwt.auth',
    'role:business'
])->group(function () {

    Route::get(
        '/business-dashboard',
        [TestController::class, 'business']
    );

});


Route::middleware([
    'jwt.auth',
    'role:admin'
])->group(function () {

    Route::get(
        '/admin-dashboard',
        [TestController::class, 'admin']
    );

});


