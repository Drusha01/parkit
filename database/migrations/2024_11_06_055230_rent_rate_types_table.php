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
            CREATE TABLE rent_rate_types(
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL, 
                date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
                date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );"));
        DB::statement(("
            ALTER TABLE rent_rate_types
            ADD UNIQUE (name(10));
            "));

        DB::statement(("
            INSERT INTO rent_rate_types(
                id,name
            ) VALUES 
            (NULL,'Parking Flat rate'),
            (NULL,'Parking with starting flat rate then per duration'),
            (NULL,'Parking per Duration')
            "));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rent_rate_types');
    }
};
