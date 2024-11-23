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
        CREATE TABLE users(
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_login_type_id INT DEFAULT 1,
            gender_id INT,
            sex_id INT ,
            google_oauth_id INT DEFAULT NULL,
            facebook_oauth_id INT DEFAULT NULL,
            username VARCHAR(100) DEFAULT NULL,
            password VARCHAR(100) DEFAULT NULL,
            is_admin BOOLEAN DEFAULT 0,
            is_space_owner BOOLEAN DEFAULT 0,
            first_name VARCHAR(255) NOT NULL, 
            middle_name VARCHAR(255) ,
            last_name VARCHAR(255) NOT NULL,
            suffix VARCHAR(100),
            birthdate DATE DEFAULT NULL,
            email VARCHAR(255) NOT NULL,
            email_verified BOOLEAN DEFAULT 0,
            mobile_number VARCHAR(20),
            mobile_number_verified BOOLEAN DEFAULT 0, 
            profile VARCHAR(100) DEFAULT NULL,
            qr_code_hash VARCHAR(100) DEFAULT NULL, 
            region_id INT, 
            province_id INT,
            city_id INT,
            brgy_id INT,
            street VARCHAR(512),
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement('
        INSERT INTO `users` (`id`, `user_login_type_id`, `gender_id`, `sex_id`, `google_oauth_id`, `facebook_oauth_id`, `username`, `password`, `is_admin`, `is_space_owner`, `first_name`, `middle_name`, `last_name`, `suffix`, `birthdate`, `email`, `email_verified`, `mobile_number`, `mobile_number_verified`, `profile`, `qr_code_hash`, `region_id`, `province_id`, `city_id`, `brgy_id`, `street`, `date_created`, `date_updated`) VALUES
        (1, 1, 1, NULL, NULL, NULL, NULL, "$argon2i$v=19$m=65536,t=4,p=1$RUxVdUVwTnoxL29WeDlVRg$24Ma0lWwGcJEqxKJw7Rxc1QFXyQext2u09ZBdfBphpY", NULL, NULL, "Hanrickson", "Etrone", "Dumapit", "", NULL, "hanzdumapit53@gmail.com", 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NOW(), NOW());
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
