<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    //
    protected $fillable = [
        'account_name',
        'number',
        'bank_name',
        'note',
        'employee_id'
    ];
}
