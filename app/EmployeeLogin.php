<?php

namespace App;

use App\BaseModel as Model;

class EmployeeLogin extends Model
{
    protected $fillable=[
        'name',
        'password',
        'active',
        'employee_id'
    ];
}
