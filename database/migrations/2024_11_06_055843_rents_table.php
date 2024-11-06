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
        DB::statement(("
        CREATE TABLE rents(
            id INT PRIMARY KEY AUTO_INCREMENT,
            vehicle_id INT NOT NULL,
            space_id INT NOT NULL,
            space_vehicle_alotment_id INT NOT NULL,
            time_start DATETIME DEFAULT CURRENT_TIMESTAMP,
            time_end DATETIME ,
            commission DOUBLE NOT NULL,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rents');
    }
};
