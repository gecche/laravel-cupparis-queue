<?php

namespace Gecche\Cupparis\Queue\Models;
use Gecche\Breeze\Breeze;
use Illuminate\Support\Facades\Auth;

class Activityqueue extends Breeze
{
    protected $table = 'queues';


    protected $guarded = [];

    public $appends = ['job_detail'];

    public static $relationsData = array(
        //'user' => array(self::BELONGS_TO, 'App\Models\User'),
    );

    public function getJobDetailAttribute() {
        $user = Auth::user();


        $detail = [
            'msg' => $this->msg,
            'input_data' => json_decode($this->input_data,true),
            'output_data' => json_decode($this->output_data,true),
            'user' => $user ? $user->getKey() : "-",
        ];
        return $detail;
    }
}
