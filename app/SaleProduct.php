<?php

namespace App;

use App\BaseModel as Model;

class SaleProduct extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'inventory_id',
        'description',
        'quantity',
        'rate',
        'amount',
        'invoice_id',
        'created_at',
        'updated_at'
    ];
}
