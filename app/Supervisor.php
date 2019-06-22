<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    //
    protected $fillable=[
        'department_id',
        'supervisor_id',
        'employee_id'
    ];
}
