<?php

namespace App;

use App\BaseModel as Model;

class EmergencyContact extends Model
{
    protected $fillable = [
        'name',
        'relationship',
        'home_tel',
        'mobile',
        'work_tel',
        'employee_id',
    ];
}
