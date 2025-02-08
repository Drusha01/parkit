<?php

namespace App\Http\Controllers\Seach;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchAPI extends Controller
{
    function search($table,$column,$sort_by,$limit,$value){
        // dd($table,$column,$sort_by,$limit,$value);
        $accepted_table = [
            'nationality',
            'refregion',
            'refprovince',
            'refcitymun',
            'refbrgy'
        ];
        if (!in_array($table,$accepted_table)){
            return "Invalid table";
        }
        if($limit ==0){
            $limit = 99999999;
        }
        $search = DB::table($table)
            ->where($column,"LIKE","%".$value."%")
            ->orderBy($column,$sort_by)
            ->limit($limit)
            ->get()
            ->toArray();
        return json_encode($search);
    }
    function search_default($table,$column,$sort_by,$limit){
        $search = DB::table($table)
            ->orderBy($column,$sort_by)
            ->limit($limit)
            ->get()
            ->toArray();
        return json_encode($search);
    }
}
