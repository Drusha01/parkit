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
        CREATE TABLE blood_types(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL, 
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement(("
        INSERT INTO blood_types(
            id,name
        ) VALUES 
        ('1','A+'),
        ('2','A-'),
        ('3','B+'),
        ('4','B-'),
        ('5','O+'),
        ('6','O-'),
        ('7','AB+'),
        ('8','AB-')
        "));
       
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_types');
    }
};
