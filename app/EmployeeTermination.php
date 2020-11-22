<?php

namespace App;

use App\BaseModel as Model;

class EmployeeTermination extends Model
{
    protected $fillable = [
        'employee_id',
        'date',
        'reason',
        'note',
    ];
}
