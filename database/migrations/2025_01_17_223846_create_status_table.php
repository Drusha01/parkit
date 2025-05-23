<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('status', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->timestamps();
        });
        DB::statement(("
        INSERT INTO status(
            id,name
        ) VALUES 
        (NULL,'Pending'),
        (NULL,'Active'),
        (NULL,'Deactivated'),
        (NULL,'Suspended'),
        (NULL,'Mismatched Details')
        "));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status');
    }
};
