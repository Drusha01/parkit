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
        
        // DB::statement(("
        // CREATE TABLE rent_rates(
        //     id INT PRIMARY KEY AUTO_INCREMENT,
        //     user_id INT NOT NULL,
        //     space_id INT NOT NULL,
        //     rent_type_id INT NOT NULL,
        //     vehicle_type_id INT NOT NULL,
        //     duration INT , -- per
        //     per duration
        //     per flat rate 
        //     flat duration
        //     with or without flat rate
        //     amount DOUBLE NOT NULL,
        //     date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
        //     date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        // );"));
        // id

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
        Schema::dropIfExists('rent_rates');
    }
};
