<?php

namespace App\Http\Controllers;

use App\Subordinate;
use Illuminate\Http\Request;

class SubordinateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $store = EmployeeSubordinate::create([
            'department_id'=>$request->department_id,
            'subordinate_id'=>$request->subordinate_id,
            'employee_id'=>$request->employee_id
        ]);
        return redirect()->action('UserController@reportTo',['id'=>$request->employee_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subordinate  $subordinate
     * @return \Illuminate\Http\Response
     */
    public function show(Subordinate $subordinate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subordinate  $subordinate
     * @return \Illuminate\Http\Response
     */
    public function edit(Subordinate $subordinate)
    {
        //
        return response()->json($employeeSubordinate);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subordinate  $subordinate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subordinate $subordinate)
    {
        //
        $update = EmployeeSubordinate::where('id',$employeeSubordinate->id)->update([
            'department_id'=>$request->department_id,
            'subordinate_id'=>$request->subordinate_id
        ]);
        return redirect()->action('UserController@reportTo',['id'=>$employeeSubordinate->employee_id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subordinate  $subordinate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subordinate $subordinate)
    {
        //
    }

    public function delete(Request $request){
        $subordinateId_arr = $request->subordinateId;
        if($subordinateId_arr!=null){
            foreach($subordinateId_arr as $id){
                $subordinate = EmployeeSubordinate::find((int)$id);
                $subordinate->delete();
            }
            return redirect()->action('UserController@reportTo',['id'=>$request->employee_id]);
        }else{
            return redirect()->action('UserController@reportTo',['id'=>$request->employee_id]);
        }
    }
}
