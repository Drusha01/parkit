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
        DB::statement("
        CREATE TABLE licenses(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            is_approved BOOLEAN DEFAULT 0,
            nationality_id INT NOT NULL,
            weight DOUBLE NOT NULL,
            height DOUBLE NOT NULL,
            license_no VARCHAR(50) NOT NULL,
            expiration_date DATE NOT NULL,
            agency_code VARCHAR(20) NOT NULL,
            blood_type_id INT NOT NULL,
            eye_color_id INT NOT NULL,
            license_condition_id INT NOT NULL,
            restriction_codes VARCHAR(255) NOT NULL,
            picture_of_license VARCHAR(50) NOT NULL,
            picture_holding_license VARCHAR(50) NOT NULL,            
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
