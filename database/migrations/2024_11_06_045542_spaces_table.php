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
            status INT DEFAULT 1,
            name VARCHAR(255) NOT NULL,
            rules VARCHAR(512) NOT NULL,
            description VARCHAR(1024) NOT NULL,
            location_long DOUBLE NOT NULL,
            location_lat DOUBLE NOT NULL,
            overall_rating DOUBLE,
            region_id INT, 
            province_id INT,
            city_id INT,
            brgy_id INT,
            street VARCHAR(512),
            hash VARCHAR(32) UNIQUE DEFAULT (MD5(CONCAT(name,NOW())))  ,
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
