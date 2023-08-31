<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('report_viewers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->index('reports_viewed')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->index('report_viewers_index')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_viewers');
    }
};
