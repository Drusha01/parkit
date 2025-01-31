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
            CREATE TABLE vehicles_v2 (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                status_id INT DEFAULT 1,
                details TEXT DEFAULT NULL,
                is_approved BOOLEAN DEFAULT 0,
                cr_file_number VARCHAR(255) NOT NULL,
                cr_plate_number VARCHAR(20),
                vehicle_type_id INT NOT NULL,
                cor_picture VARCHAR(50),
                cor_holding_picture VARCHAR(50),
                left_side_picture VARCHAR(50),
                right_side_picture VARCHAR(50),
                front_side_picture VARCHAR(50),
                back_side_picture VARCHAR(50),
                hash VARCHAR(32) UNIQUE DEFAULT (MD5(CONCAT(cr_file_number, cr_plate_number,NOW())))  
                date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
                date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            );
        "));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles_v2');
    }
};
