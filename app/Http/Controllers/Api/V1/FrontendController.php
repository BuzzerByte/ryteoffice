<?php
namespace App\Http\Controllers\Api\V1;

class FrontendController extends Controller
{
    public function home()
    {
        return view('front.index');
    }
}
