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
        CREATE TABLE reports(
            id INT PRIMARY KEY AUTO_INCREMENT,
            report_by_user_id INT NOT NULL,
            is_renter BOOLEAN DEFAULT 1,
            vehicle_id INT NOT NULL,
            space_id INT NOT NULL,
            remarks VARCHAR(1024) NOT NULL,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
