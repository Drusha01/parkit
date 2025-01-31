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
        CREATE TABLE licenses_v2(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            is_approved BOOLEAN DEFAULT 0,
            license_no VARCHAR(50) NOT NULL,
            picture_of_license VARCHAR(50) NOT NULL,
            picture_holding_license VARCHAR(50) NOT NULL,    
            hash VARCHAR(32) UNIQUE DEFAULT (MD5(CONCAT(cr_file_number, cr_plate_number,NOW())))          
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses_v2');
    }
};
