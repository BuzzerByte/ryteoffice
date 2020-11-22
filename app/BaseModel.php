<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\UseUuid;

class BaseModel extends Model
{
    use HasFactory;
    use UseUuid;
}
