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
        CREATE TABLE vehicle_types(
            id INT PRIMARY KEY AUTO_INCREMENT,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(512) NULL,
            icon VARCHAR(50) NOT NULL ,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement(("
        INSERT INTO vehicle_types(
            id,type,name,icon
        ) VALUES 
        ('1','M','Motorcycle','Motorcycle.png'),
        ('2','C','Car','Car.png'),  
        ('3','T','Tricycle','Tricycle.png'),
        ('4','J','Jeepney','Jeepney.png'),
        ('5','V','Van','Van.png'),
        ('6','LCV','Light Comercial Vehicle','Light Comercial Vehicle.png'),
        ('7','HCV','Heavy Comercial Vehicle','Heavy Comercial Vehicle.png'),
        ('8','LB','Light Buses','Light Buses.png'),
        ('9','HB','Heavy Buses','Heavy Buses.png'),
        ('10','LAV','Light Articulated Vehicle','Light Articulated Vehicle.png'),
        ('11','HAV','Heavy Articulated Vehicle','Heavy Articulated Vehicle.png')
        "));


        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_types');
    }
};
