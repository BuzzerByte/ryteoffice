<?php

namespace App;

use App\BaseModel as Model;

class JobTitle extends Model
{
    //
    protected $fillable = [
        'title',
        'description'
    ];
}
