<?php

namespace App;

use App\BaseModel as Model;

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
