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
        CREATE TABLE license_conditions(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL, 
            details VARCHAR(512) NOT NULL,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement(("
        INSERT INTO license_conditions(
            id,name,details
        ) VALUES 
        ('1','Condition 1','None'),
        ('2','Condition 2','Wear eyeglasses'),
        ('3','Condition 3','Drive with special equipment for upper/lower limbs*'),
        ('4','Condition 4','Customized vehicle only'),
        ('5','Condition 5','Daylight driving only*'),
        ('6','Condition 6','Should always be accompanied by a person without hearing impairment')
        "));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('license_conditions');
    }
};
