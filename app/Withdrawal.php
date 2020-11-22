<?php

namespace App;

use App\BaseModel as Model;

class Withdrawal extends Model
{
    protected $fillable = [
        'inventory_id',
        'w_quantity',
        'withdrawer',
        'project_id',
    ];
}
