<?php namespace App\Queue;


use Illuminate\Support\Facades\Log;

class TestQueue extends TTQueue {

    public function fire($job, $data) {
        $this->jobStart ($job,$data, 'test' );
        try {

            foreach (range(1,3) as $i) {
                //Log::info($i . " --> " . app()->domain() . ' --- ' . $this->job->getJobId());
                sleep(1);
            }


            $subject = 'prova email ' . date('d-m-Y');

            $attachments = [

            ];


            //$this->sendEmail('Email test.',$subject,$attachments);

            $this->jobEnd ();
        } catch (\Exception $e) {
            $this->jobEnd(1,$e->getMessage());
            throw $e;
        }

    }

}