<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

class DepreciationController extends Controller
{
    public function index()
    {
        return view('admin.depreciation.index');
    }

    public function create()
    {
        return view('admin.depreciation.create');
    }
}
