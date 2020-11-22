<?php

namespace App;

use App\BaseModel as Model;

class Deposit extends Model
{
    //
    protected $fillable = [
        'account_name',
        'number',
        'bank_name',
        'note',
        'employee_id'
    ];
}
