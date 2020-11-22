<?php

namespace App;

use App\BaseModel as Model;

class Termination extends Model
{
    //
    protected $fillable = [
        'employee_id',
        'date',
        'reason',
        'note',
    ];
}
