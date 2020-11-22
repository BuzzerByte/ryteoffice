<?php

namespace App;

use App\BaseModel as Model;

class LeaveType extends Model
{
    //
    protected $fillable = [
        'name',
        'user_id'
    ];
}
