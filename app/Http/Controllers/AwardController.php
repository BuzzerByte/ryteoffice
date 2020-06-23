<?php

namespace App\Http\Controllers;

use App\Award;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(Auth::user()->hasRole('admin')){
            $awards = EmployeeAward::all();
            $employees = User::all();
            $departments = Department::all();
            return view('admin.employeeAwards.index',['awards'=>$awards,'employees'=>$employees,'departments'=>$departments]);
        }else{
            $awards = EmployeeAward::all();
            $employees = User::all();
            $departments = Department::all();
            return view('users.awards.index',['awards'=>$awards,'employees'=>$employees,'departments'=>$departments]);
        }
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
        $request->month = \Carbon\Carbon::parse($request->month)->format('Y-m-d');
        $store = EmployeeAward::create([
            'department_id'=>(int)$request->department_id,
            'employee_id'=>(int)$request->employee_id,
            'award'=>$request->award_name,
            'gift'=>$request->gift_item,
            'amount'=>$request->award_amount,
            'month'=>$request->month
        ]);
        return redirect()->action('EmployeeAwardController@index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function show(Award $award)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function edit(Award $award)
    {
        //
        return response()->json($award);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Award $award)
    {
        //
        $request->month = \Carbon\Carbon::parse($request->month)->format('Y-m-d');
        $update = EmployeeAward::where('id',$employeeAward->id)->update([
            'department_id'=>$request->department_id,
            'employee_id'=>$request->employee_id,
            'award'=>$request->award_name,
            'gift'=>$request->gift_item,
            'amount'=>$request->award_amount,
            'month'=>$request->month,
        ]);
        return redirect()->action('EmployeeAwardController@index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function destroy(Award $award)
    {
        //
        return response()->json($award);
    }

    public function delete(EmployeeAward $employeeAward)
    {
        $delete = EmployeeAward::find($employeeAward->id);
        $delete->delete();
        
        return redirect()->action(
            'EmployeeAwardController@index'
        );
    }
}
