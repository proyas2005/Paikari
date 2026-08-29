<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('oauth_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('provider'); // 'google', 'github', etc.
            $table->string('provider_id')->unique(); // Google ID, GitHub ID, etc.
            $table->json('profile_data')->nullable(); // Store user data from provider
            $table->timestamp('connected_at')->useCurrent();
            $table->timestamps();

            $table->unique(['user_id', 'provider']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('oauth_providers');
    }
};
