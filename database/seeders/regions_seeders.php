<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class regions_seeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("DROP TABLE IF EXISTS `refregion`;");
        DB::statement("CREATE TABLE `refregion` ( `id` int(11) NOT NULL AUTO_INCREMENT, `psgcCode` varchar(255) DEFAULT NULL, `regDesc` text, `regCode` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`));");


        DB::statement("INSERT INTO `refregion` VALUES ('1', '010000000', 'REGION I (ILOCOS REGION)', '01');");
        DB::statement("INSERT INTO `refregion` VALUES ('2', '020000000', 'REGION II (CAGAYAN VALLEY)', '02');");
        DB::statement("INSERT INTO `refregion` VALUES ('3', '030000000', 'REGION III (CENTRAL LUZON)', '03');");
        DB::statement("INSERT INTO `refregion` VALUES ('4', '040000000', 'REGION IV-A (CALABARZON)', '04');");
        DB::statement("INSERT INTO `refregion` VALUES ('5', '170000000', 'REGION IV-B (MIMAROPA)', '17');");
        DB::statement("INSERT INTO `refregion` VALUES ('6', '050000000', 'REGION V (BICOL REGION)', '05');");
        DB::statement("INSERT INTO `refregion` VALUES ('7', '060000000', 'REGION VI (WESTERN VISAYAS)', '06');");
        DB::statement("INSERT INTO `refregion` VALUES ('8', '070000000', 'REGION VII (CENTRAL VISAYAS)', '07');");
        DB::statement("INSERT INTO `refregion` VALUES ('9', '080000000', 'REGION VIII (EASTERN VISAYAS)', '08');");
        DB::statement("INSERT INTO `refregion` VALUES ('10', '090000000', 'REGION IX (ZAMBOANGA PENINSULA)', '09');");
        DB::statement("INSERT INTO `refregion` VALUES ('11', '100000000', 'REGION X (NORTHERN MINDANAO)', '10');");
        DB::statement("INSERT INTO `refregion` VALUES ('12', '110000000', 'REGION XI (DAVAO REGION)', '11');");
        DB::statement("INSERT INTO `refregion` VALUES ('13', '120000000', 'REGION XII (SOCCSKSARGEN)', '12');");
        DB::statement("INSERT INTO `refregion` VALUES ('14', '130000000', 'NATIONAL CAPITAL REGION (NCR)', '13');");
        DB::statement("INSERT INTO `refregion` VALUES ('15', '140000000', 'CORDILLERA ADMINISTRATIVE REGION (CAR)', '14');");
        DB::statement("INSERT INTO `refregion` VALUES ('16', '150000000', 'AUTONOMOUS REGION IN MUSLIM MINDANAO (ARMM)', '15');");
        DB::statement("INSERT INTO `refregion` VALUES ('17', '160000000', 'REGION XIII (Caraga)', '16');");
    }
}
