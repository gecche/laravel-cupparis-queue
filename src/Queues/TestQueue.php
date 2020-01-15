<?php namespace App\Queue;


use Gecche\Cupparis\Queue\MainQueue;
use Illuminate\Support\Facades\Log;

class TestQueue extends MainQueue {

    public function fire($job, $data) {
        $this->jobStart ($job,$data, 'test' );
        try {

            foreach (range(1,3) as $i) {
                //Log::info($i . " --> " . app()->domain() . ' --- ' . $this->job->getJobId());
                sleep(1);
            }
            
            $this->jobEnd ();
        } catch (\Exception $e) {
            $this->jobEnd(1,$e->getMessage());
            throw $e;
        }

    }

}