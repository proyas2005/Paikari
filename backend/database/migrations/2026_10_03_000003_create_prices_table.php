<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();
            $table->foreignId('submitter_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('currency', 8)->default('BDT');
            $table->string('photo_path')->nullable();
            $table->string('status', 20)->default('pending');
            $table->timestamps();

            $table->index('status');
            $table->index(['product_id', 'location_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};