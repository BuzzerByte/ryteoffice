<?php

namespace App;

use App\BaseModel as Model;

class PayGrade extends Model
{
    //
    protected $fillable=[
        'name',
        'minimum',
        'maximum'
    ];
}
