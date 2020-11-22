<?php

namespace App;

use App\BaseModel as Model;

class EmployeeSupervisor extends Model
{
    protected $fillable=[
        'department_id',
        'supervisor_id',
        'employee_id'
    ];
}
