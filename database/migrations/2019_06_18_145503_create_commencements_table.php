<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommencementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commencements', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('join_date')->nullable();
            $table->date('probation_end')->nullable();
            $table->date('dop')->nullable();
            $table->integer('employee_id')->unsigned()->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commencements');
    }
}
