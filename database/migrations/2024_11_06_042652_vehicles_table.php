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
        CREATE TABLE vehicles(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            is_approved BOOLEAN DEFAULT 0,
            vehicle_type_id INT NOT NULL,
            brand VARCHAR(255),
            unit VARCHAR(255),
            cr_file_number VARCHAR(255) NOT NULL,
            cr_plate_number VARCHAR(20),
            cr_no VARCHAR(50) ,
            cr_vehicle_owner VARCHAR(300),
            cr_picture VARCHAR(50),
            or_picture VARCHAR(50) ,
            or_expiration_date DATE ,
            or_color VARCHAR(50),
            front_side_picture VARCHAR(50) ,
            back_side_picture VARCHAR(50) ,
            left_side_picture VARCHAR(50) ,
            right_side_picture VARCHAR(50) ,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
