<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('shop_name');
            $table->string('type', 30)->default('retailer'); // 'retailer' | 'wholesaler'
            $table->boolean('verified')->default(false);
            $table->timestamps();

            $table->index('verified');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};