<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('price_id')->constrained('prices')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('vote_type', 10); // 'up' | 'down' | 'flag'
            $table->timestamps();

            $table->unique(['price_id', 'user_id']);
            $table->index('vote_type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};