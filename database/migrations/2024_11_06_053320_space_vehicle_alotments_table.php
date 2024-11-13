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
            vehicle_id INT NOT NULL, 
            vehicle_count INT NOT NULL,
            rate_type_id INT NOT NULL,
            base_rate DOUBLE NOT NULL,
            over_time_rate DOUBLE NOT NULL,            
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('space_vehicle_alotments');
    }
};
