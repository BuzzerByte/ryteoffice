<?php

namespace App;

use App\BaseModel as Model;

class Supervisor extends Model
{
    //
    protected $fillable=[
        'department_id',
        'supervisor_id',
        'employee_id'
    ];
}
