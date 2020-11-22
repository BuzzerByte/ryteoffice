<?php

namespace App;

use App\BaseModel as Model;

class WorkingDay extends Model
{
    //
    protected $fillable = [
        'day',
        'work',
        'user_id'
    ];
}
