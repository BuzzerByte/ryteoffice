<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('role')->default('user');
            $table->string('f_name')->nullable();
            $table->string('l_name')->nullable();
            $table->date('dob')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('country')->nullable();
            $table->string('blood_group')->nullable();
            $table->string('id_number')->nullable();
            $table->string('religious')->nullable();
            $table->string('photo')->nullable();
            $table->string('gender')->nullable();
            $table->boolean('terminate_status')->nullable();
            $table->text('auth_token')->nullable();
            $table->string('last_signin')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
