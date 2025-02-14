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
        DB::statement('CREATE TABLE payment_logs(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            rent_id INT DEFAULT NULL,
            amount_paid DOUBLE NOT NULL,
            commission DOUBLE NOT NULL,
            log_details VARCHAR(1028),
            link VARCHAR(255),
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_logs');
    }
};
