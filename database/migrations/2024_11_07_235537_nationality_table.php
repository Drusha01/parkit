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
        CREATE TABLE nationality(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL, 
            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );"));

        DB::statement(("
        ALTER TABLE nationality
        ADD UNIQUE (name(10));
        "));

        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Afghan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Albanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Algerian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"American");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Andorran");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Angolan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Antiguans");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Argentinean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Armenian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Australian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Austrian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Azerbaijani");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bahamian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bahraini");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bangladeshi");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Barbadian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Barbudans");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Batswana");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Belarusian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Belgian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Belizean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Beninese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bhutanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bolivian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bosnian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Brazilian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"British");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bruneian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Bulgarian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Burkinabe");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Burmese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Burundian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Cambodian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Cameroonian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Canadian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Cape Verdean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Central African");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Chadian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Chilean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Chinese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Colombian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Comoran");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Congolese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Costa Rican");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Croatian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Cuban");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Cypriot");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Czech");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Danish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Djibouti");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Dominican");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Dutch");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"East Timorese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ecuadorean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Egyptian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Emirian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Equatorial Guinean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Eritrean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Estonian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ethiopian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Fijian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Filipino");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Finnish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"French");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Gabonese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Gambian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Georgian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"German");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ghanaian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Greek");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Grenadian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Guatemalan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Guinea-Bissauan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Guinean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Guyanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Haitian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Herzegovinian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Honduran");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Hungarian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"I-Kiribati");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Icelander");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Indian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Indonesian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Iranian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Iraqi");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Irish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Israeli");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Italian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ivorian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Jamaican");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Japanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Jordanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Kazakhstani");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Kenyan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Kittian and Nevisian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Kuwaiti");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Kyrgyz");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Laotian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Latvian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Lebanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Liberian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Libyan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Liechtensteiner");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Lithuanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Luxembourger");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Macedonian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Malagasy");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Malawian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Malaysian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Maldivian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Malian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Maltese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Marshallese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mauritanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mauritian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mexican");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Micronesian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Moldovan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Monacan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mongolian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Moroccan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mosotho");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Motswana");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Mozambican");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Namibian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Nauruan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Nepalese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"New Zealander");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ni-Vanuatu");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Nicaraguan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Nigerian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Nigerien");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"North Korean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Northern Irish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Norwegian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Omani");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Pakistani");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Palauan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Panamanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Papua New Guinean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Paraguayan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Peruvian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Polish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Portuguese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Qatari");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Romanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Russian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Rwandan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Saint Lucian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Salvadoran");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Samoan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"San Marinese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Sao Tomean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Saudi");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Scottish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Senegalese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Serbian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Seychellois");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Sierra Leonean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Singaporean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Slovakian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Slovenian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Solomon Islander");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Somali");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"South African");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"South Korean");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Spanish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Sri Lankan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Sudanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Surinamer");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Swazi");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Swedish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Swiss");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Syrian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Taiwanese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Tajik");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Tanzanian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Thai");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Togolese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Tongan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Trinidadian or Tobagonian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Tunisian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Turkish");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Tuvaluan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ugandan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Ukrainian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Uruguayan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Uzbekistani");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Venezuelan");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Vietnamese");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Welsh");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Yemenite");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Zambian");');
        DB::statement('INSERT INTO nationality(id,name) VALUES(NULL,"Zimbabwean");');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
