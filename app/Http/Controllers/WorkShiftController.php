<?php

namespace App\Http\Controllers;

use App\WorkShift;
use Illuminate\Http\Request;

class WorkShiftController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $workshifts = WorkShift::all();
        return view('admin.workShifts.index',['workshifts'=>$workshifts]);
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
        $request->shift_from = Carbon::parse($request->shift_from)->format('H:i');
        $request->shift_to = Carbon::parse($request->shift_to)->format('H:i');
        $store = WorkShift::create([
            'name'=>$request->shift_name,
            'from'=>$request->shift_from,
            'to'=>$request->shift_to
        ]);
        return redirect()->action('WorkShiftController@index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\WorkShift  $workShift
     * @return \Illuminate\Http\Response
     */
    public function show(WorkShift $workShift)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\WorkShift  $workShift
     * @return \Illuminate\Http\Response
     */
    public function edit(WorkShift $workShift)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WorkShift  $workShift
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WorkShift $workShift)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WorkShift  $workShift
     * @return \Illuminate\Http\Response
     */
    public function destroy(WorkShift $workShift)
    {
        //
    }
}
