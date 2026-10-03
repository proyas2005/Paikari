<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prices', function (Blueprint $table) {
            $table->dropForeign(['submitter_id']);
            $table->unsignedBigInteger('submitter_id')->nullable()->change();
            $table->foreign('submitter_id')
                ->references('id')
                ->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('prices', function (Blueprint $table) {
            $table->dropForeign(['submitter_id']);
            $table->unsignedBigInteger('submitter_id')->nullable(false)->change();
            $table->foreign('submitter_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
        });
    }
};
