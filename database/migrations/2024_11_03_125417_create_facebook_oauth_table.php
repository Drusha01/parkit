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
        CREATE TABLE facebook_oauth(
            id INT PRIMARY KEY AUTO_INCREMENT,
            facebook_id VARCHAR(255) NOT NULL,
            email_verified BOOLEAN NOT NULL DEFAULT 0,
            email VARCHAR(255) NOT NULL,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
        ");
        DB::statement(("
        ALTER TABLE facebook_oauth
        ADD UNIQUE (facebook_id(10));
        "));
        DB::statement(("
        ALTER TABLE facebook_oauth
        ADD UNIQUE (email(10));
        "));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facebook_oauth');
    }
};
