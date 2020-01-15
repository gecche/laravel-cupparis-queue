<?php
/**
 * Created by PhpStorm.
 * User: giacomoterreni
 * Date: 2020-01-15
 * Time: 13:15
 */

namespace Gecche\Cupparis\Queue\Contracts;


use Gecche\Cupparis\Queue\MainQueue;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

interface CupparisQueueContract
{
    public function jobEnd($error = 0, $msg = "");

    public function jobProgress($progress);

    public function jobStart($job, $data, $job_type);
}