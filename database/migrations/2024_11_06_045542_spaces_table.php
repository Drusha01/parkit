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
        DB::statement(("
        CREATE TABLE spaces(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            is_approved BOOLEAN DEFAULT 0,
            name VARCHAR(255) NOT NULL,
            rules VARCHAR(512) NOT NULL,
            description VARCHAR(1024) NOT NULL,
            area_m2 DOUBLE NOT NULL,
            location_long DOUBLE NOT NULL,
            location_lat DOUBLE NOT NULL,
            overall_rating DOUBLE,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spaces');
    }
};
