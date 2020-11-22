<?php

namespace App;

use App\BaseModel as Model;

class SalaryComponent extends Model
{
    //
    protected $fillable = [
        'component_name',
        'type',
        'total_payable',
        'cost_company',
        'value_type'
    ];
}
