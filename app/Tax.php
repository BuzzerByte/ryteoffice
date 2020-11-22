<?php

namespace App;

use App\BaseModel as Model;

class Tax extends Model
{
    protected $fillable = [
        'name',
        'rate',
        'type',
    ];
}
