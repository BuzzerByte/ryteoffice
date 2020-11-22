<?php

namespace App;

use App\BaseModel as Model;
use App\PermissionRole;

class Role extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description',
        'user_id'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function permissions()
    {
        return $this->belongsToMany('App\Permission');
    }
}