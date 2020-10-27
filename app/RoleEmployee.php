<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
