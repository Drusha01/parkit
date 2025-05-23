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
        CREATE TABLE space_vehicle_alotments(
            id INT PRIMARY KEY AUTO_INCREMENT,
            space_id INT NOT NULL,
            vehicle_type_id INT NOT NULL, 
            vehicle_count INT NOT NULL,
            current_vehicle_count INT DEFAULT 0,
            rent_rate_type_id INT NOT NULL,
            rent_duration INT ,-- in seconds
            rent_duration_rate DOUBLE, -- rates per duration/s
            rent_flat_rate_duration INT, -- in seconds how long will the flat rate duration 
            rent_flat_rate DOUBLE DEFAULT 0, -- flat rate
            is_active BOOLEAN DEFAULT 1,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        // rent_type_id  -- will be the base for calculation
        // duration -- in seconds
        // duration_rate 
        // flat_rate
        // 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('space_vehicle_alotments');
    }
};
