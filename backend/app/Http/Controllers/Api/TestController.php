<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function user()
    {
        return response()->json([
            'message' => 'User dashboard'
        ]);
    }

    public function business()
    {
        return response()->json([
            'message' => 'Business dashboard'
        ]);
    }

    public function admin()
    {
        return response()->json([
            'message' => 'Admin dashboard'
        ]);
    }
}