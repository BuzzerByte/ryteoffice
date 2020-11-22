<?php

namespace App;

use App\BaseModel as Model;

class Holiday extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'start',
        'end',
        'user_id'
    ];
}
