<?php

namespace App;

use App\BaseModel as Model;

class EmployeeAttachment extends Model
{
    protected $fillable = [
        'name',
        'description',
        'added_by',
        'employee_id'
    ];
}
