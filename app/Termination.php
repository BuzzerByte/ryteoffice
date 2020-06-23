<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
