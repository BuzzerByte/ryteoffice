<?php

namespace App;

use App\BaseModel as Model;

class WorkShift extends Model
{
    //
    protected $fillable = [
        'name',
        'from',
        'to'
    ];
}
