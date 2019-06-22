<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subordinate extends Model
{
    //
    protected $fillable=[
        'department_id',
        'subordinate_id',
        'employee_id'
    ];
}
