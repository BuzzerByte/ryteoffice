<?php

namespace App;

use App\BaseModel as Model;

class QuotationProduct extends Model
{
    protected $fillable = [
        'inventory_id',
        'description',
        'quantity',
        'rate',
        'amount',
        'quotation_id'
    ];
}
