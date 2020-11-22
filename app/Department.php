<?php

namespace App;

use App\JobHistory;
use App\Department;
use App\BaseModel as Model;

class Department extends Model
{
    //
    protected $fillable = [
        'name',
        'description',
        'user_id'
    ];

    public function jobHistory(){
        return $this->hasMany('JobHistory');
    }
}
