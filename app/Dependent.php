<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dependent extends Model
{
    //
    protected $fillable=[
        'name',
        'relationship',
        'dob',
        'employee_id'
    ];
}
