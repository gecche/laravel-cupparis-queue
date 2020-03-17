<?php
/**
 * Created by PhpStorm.
 * User: giacomoterreni
 * Date: 2020-01-15
 * Time: 13:15
 */

namespace Gecche\Cupparis\Queue\Contracts;

interface CupparisQueueContract
{
    public function jobEnd($error = 0, $msg = "");

    public function jobProgress($progress);

    public function jobStart($job, $data, $job_type);
}