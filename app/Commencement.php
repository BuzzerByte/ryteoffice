<?php

namespace App;

use App\BaseModel as Model;

class Commencement extends Model
{
    //
    protected $fillable = [
        'join_date',
        'probation_end',
        'dop',
        'employee_id'
    ];
}
