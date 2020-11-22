<?php

namespace App;

use App\BaseModel as Model;

class RoleUser extends Model
{
    public $timestamps = false;
    protected $table = 'role_user';

    protected $fillable = [
        'role_id',
        'user_id'
    ];
}
