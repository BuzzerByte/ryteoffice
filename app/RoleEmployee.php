<?php

namespace App;

use App\BaseModel as Model;

class RoleEmployee extends Model
{
    //
    public $timestamps = false;
    protected $table = 'role_employee';

    protected $fillable = [
        'employee_id',
        'user_id'
    ];
}
