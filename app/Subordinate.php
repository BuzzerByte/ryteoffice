<?php

namespace App;

use App\BaseModel as Model;

class Subordinate extends Model
{
    //
    protected $fillable=[
        'department_id',
        'subordinate_id',
        'employee_id'
    ];
}
