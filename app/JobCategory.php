<?php

namespace App;

use App\BaseModel as Model;

class JobCategory extends Model
{
    //
    protected $fillable = [
        'category',
        'user_id'
    ];

    public function jobHistory(){
        return $this->hasMany('JobHistory');
    }
}
