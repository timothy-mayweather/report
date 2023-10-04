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
        Schema::create('share_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employment_role_id')->constrained()->cascadeOnDelete();
	          $table->foreignId('shared_role')->references('id')->on('employment_roles')->constrained()->cascadeOnDelete();
						$table->string('role_shared')->unique(); //roleId_sharedRoleId
						$table->boolean('edit')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('share_rules');
    }
};
