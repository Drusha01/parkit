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
        DB::statement("
            CREATE TABLE requests_topups (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                user_id BIGINT NOT NULL, 
                created_by BIGINT NOT NULL,
                amount DOUBLE NOT NULL, 
                reference_photo VARCHAR(255) NOT NULL,
                status ENUM('Pending', 'Not found', 'Complete', 'Value mismatch') NOT NULL DEFAULT 'Pending',
                remarks varchar(512) default null, 
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
