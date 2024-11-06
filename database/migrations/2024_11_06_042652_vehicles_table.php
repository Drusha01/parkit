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
        CREATE TABLE vehicles(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            vehicle_type_id INT NOT NULL,
            cr_file_number VARCHAR(255) NOT NULL,
            cr_plate_number VARCHAR(20),
            cr_no VARCHAR(50) ,
            cr_vehicle_owner VARCHAR(300),
            cr_picture VARCHAR(50) NOT NULL,
            or_picture VARCHAR(50) NOT NULL,
            or_expiration_date DATE NOT NULL,
            or_color VARCHAR(50) NOT NULL,
            front_size_picture VARCHAR(50) NOT NULL,
            back_side_picture VARCHAR(50) NOT NULL,
            left_side_picture VARCHAR(50) NOT NULL,
            right_side_picture VARCHAR(50) NOT NULL,

  
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
