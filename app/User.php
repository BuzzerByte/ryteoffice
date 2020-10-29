<?php

namespace App;

use App\Traits\HasJWT;
use App\Contracts\Uploader;
use App\Traits\UploadsFiles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject, Uploader
{
    use Notifiable, HasJWT, UploadsFiles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes used for uploads.
     *
     * @var array
     */
    protected $uploadAttributes = [
        'directory',
        'filename',
        'original_filename',
        'filesize',
        'thumbnail_filesize',
        'url',
        'thumbnail_url'
    ];

    protected $fillable = [
        'name', 
        'email', 
        'password', 
        'role',
        'facebook_id', 
        'google_id',
        'github_id',
        'skin',
        'f_name',
        'l_name',
        'dob',
        'marital_status',
        'country',
        'blood_group',
        'id_number',
        'religious',
        'gender',
        'terminate_status',
    ];

    /**
     * Get the directory for uploads.
     *
     * @return string
     */
    public function getDirectory() : string
    {
        return 'users/'.$this->getKey();
    }

    /**
     * Get the upload attributes
     *
     * @return array
     */
    public function getUploadAttributes() : array
    {
        return $this->uploadAttributes;
    }

    public function jobHistories($id){
        return JobHistory::select('department_id')->where('employee_id',$id)->first();
    }

    public function department($id){
        $department = JobHistory::where('employee_id',$id)->exists();
        if($department){
            $deparment_id = JobHistory::where('employee_id',$id)->first()->department_id;
            return Department::where('id',$deparment_id)->first()->name;
        }else{
            return "No Job History Found";
        }
    }

    public function jobTitle($id){
        $jobTitle = JobHistory::where('employee_id',$id)->exists();
        if($jobTitle){
            $titleId = JobHistory::where('employee_id',$id)->first()->title_id;
            return JobTitle::where('id',$titleId)->first()->title;
        }else{
            return "No Job History found";
        }
    }

    public function jobCategory($id){
        $jobCategory = JobHistory::where('employee_id',$id)->exists();
        if($jobCategory){
            $jobCategoryId = JobHistory::where('employee_id',$id)->first()->category_id;
            return JobCategory::where('id',$jobCategoryId)->first()->category;
        }else{
            return "No Job History found";
        }
    }

    public function workShift($id){
        $workShift = JobHistory::where('employee_id',$id)->exists();
        if($workShift){
            $workShiftId = JobHistory::where('employee_id',$id)->first()->shift_id;
            return WorkShift::where('id',$workShiftId)->first()->name;
        }else{
            return "No Job History found";
        }
    }
}