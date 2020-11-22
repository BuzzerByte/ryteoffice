<?php

namespace App;

use App\BaseModel as Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'user_id'
    ];
}
