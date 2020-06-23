<?php

namespace App\Http\Controllers;

use App\Commencement;
use Illuminate\Http\Request;

class CommencementController extends Controller
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
        $store = EmployeeCommencement::updateOrCreate(
            ['employee_id'=>$request->employee_id],
            ['join_date'=>$request->joined_date,
            'probation_end'=>$request->probation_end_date,
            'dop'=>$request->date_of_permanency]
        );
        if($store){

        }else{

        }
        return redirect()->action('UserController@employeeCommencements',['id'=>$request->employee_id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Commencement  $commencement
     * @return \Illuminate\Http\Response
     */
    public function show(Commencement $commencement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Commencement  $commencement
     * @return \Illuminate\Http\Response
     */
    public function edit(Commencement $commencement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Commencement  $commencement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Commencement $commencement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Commencement  $commencement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Commencement $commencement)
    {
        //
    }
}
