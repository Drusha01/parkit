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
        CREATE TABLE vehicle_types(
            id INT PRIMARY KEY AUTO_INCREMENT,
            parking_unit INT DEFAULT 1,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(512) NULL,
            icon VARCHAR(50) NOT NULL ,
            is_active BOOLEAN default 1,
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement(("
        INSERT INTO vehicle_types(
            id,parking_unit,type,name,icon
        ) VALUES 
        ('1',1,'M','Motorcycle','Motorcycle.png'),
        ('2',4,'C','Car','Car.png'),  
        ('3',2,'T','Tricycle','Tricycle.png'),
        ('4',6,'J','Jeepney','Jeepney.png'),
        ('5',6,'V','Van','Van.png'),
        ('6',6,'LCV','Light Comercial Vehicle','Light Comercial Vehicle.png'),
        ('7',6,'HCV','Heavy Comercial Vehicle','Heavy Comercial Vehicle.png'),
        ('8',10,'LB','Light Buses','Light Buses.png'),
        ('9',10,'HB','Heavy Buses','Heavy Buses.png'),
        ('10',10,'LAV','Light Articulated Vehicle','Light Articulated Vehicle.png'),
        ('11',10,'HAV','Heavy Articulated Vehicle','Heavy Articulated Vehicle.png')
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
