<?php

namespace App\Repositories\Interfaces;

use Illuminate\Http\Request;

interface IEmployeeAwardRepository{
    public function all();
    public function store(Request $request);
    public function update(Request $request, $id);
    public function destroy($id);
}