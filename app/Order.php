<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    //
    protected $fillable = [
        'client_id',
        'invoice_date',
        'due_date',
        'total',
        'g_total',
        'tax',
        'discount',
        'receive_amt',
        'amt_due',
        'status',
        'order_note',
        'order_activities',
        'created_at',
        'updated_at'
    ];

    public function product(){
        return $this->belongsTo('buzzeroffice\Inventory');
    }

    public function timeFormat($dateTime){
        return Carbon::parse($dateTime)->format('d M Y');
    }

    public function orderClient($id){
        $clientId = Order::where('id',$id)->first()->client_id;
        return Client::where('id',$clientId)->first()->name;
    }
}
