<?php

namespace App;

use App\BaseModel as Model;

class EmployeeDeposit extends Model
{
    protected $fillable = [
        'account_name',
        'number',
        'bank_name',
        'note',
        'employee_id'
    ];
}
