<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    //
    protected $fillable = [
        'name',
        'company',
        'phone',
        'open_balance',
        'fax',
        'email',
        'website',
        'billing_address',
        'shipping_address',
        'note',
        'created_at',
        'updated_at',
    ];
}
