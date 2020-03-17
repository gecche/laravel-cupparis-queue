<?php namespace Gecche\Cupparis\Queue\Queues;


use Gecche\Cupparis\Queue\Contracts\CupparisQueueContract;
use Gecche\Cupparis\Queue\CupparisQueueTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MainQueue implements CupparisQueueContract
{

    use CupparisQueueTrait;

    protected $config = null;
    // class principale queue
    protected $data = array();
    protected $acQueue = null;
    protected $job = null;
    protected $output_data = [];

    public function __construct()
    {
        $this->config = Config::get('cupparis-queue',[]);
    }

    public function jobStart($job, $data, $job_type)
    {
        $this->data = $data;
        $this->job = $job;
        //Activityqueue::where('job_id',$this->job->getJobId())->delete();
        $queueModelName = Arr::get($this->config, 'model');
        $this->acQueue = $queueModelName::findOrFail(Arr::get($data, 'activityqueue_id', -1));
        $this->acQueue->start = date("Y-m-d H:i:s");
        $this->acQueue->job_id = $this->job->getJobId();
        $this->acQueue->job_type = $job_type;
        $this->acQueue->input_data = cupparis_json_encode($data);
        $this->acQueue->save();
        $queueId = $this->acQueue->getKey();
        $v = $this->acQueue->toArray();
        //echo "start\n";
        //print_r($v);
        Storage::put($this->getQueueFilename($queueId), cupparis_json_encode($v));
    }

    public function jobEnd($error = 0, $msg = "")
    {
        $this->acQueue->error = $error;
        $this->acQueue->msg = $msg;
        $this->acQueue->end = date("Y-m-d H:i:s");
        $this->acQueue->output_data = cupparis_json_encode($this->output_data);
        $this->acQueue->save();

        $v = $this->acQueue->toArray();

        $v['error'] = $error;
        $v['msg'] = $msg;
//		echo "end\n";
//		print_r($v);
        Storage::put($this->getQueueFilename($this->acQueue->getKey()), cupparis_json_encode($v));
        $this->job->delete();
    }

    public function jobProgress($progress)
    {
        $this->acQueue->progress = $progress;
        $this->acQueue->save();
        $v = $this->acQueue->toArray();
        $v['progress'] = $progress;
//		echo "progress\n";
//		print_r($v);
        Storage::put($this->getQueueFilename($this->acQueue->getKey()), cupparis_json_encode($v));
    }
    // fine classe principale
}