<?php

namespace App;

use App\BaseModel as Model;

class PermissionRole extends Model
{
    public $timestamps = false;
    protected $table = 'permission_role';

    protected $fillable = [
        'permission_id',
        'role_id'
    ];
}
