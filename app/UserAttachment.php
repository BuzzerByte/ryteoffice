<?php

namespace App;

use App\BaseModel as Model;

class UserAttachment extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'added_by',
        'user_id'
    ];
}
