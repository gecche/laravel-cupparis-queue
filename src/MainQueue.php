<?php namespace Gecche\Cupparis\Queue;


use Illuminate\Support\Facades\File;

class MainQueue
{
    // class principale queue
    protected $data = array();
    protected $acQueue = null;
    protected $job = null;
    protected $output_data = [];

    public function __construct()
    {
    }

    protected function jobStart($job, $data, $job_type)
    {
        $this->data = $data;
        $this->job = $job;
        //Activityqueue::where('job_id',$this->job->getJobId())->delete();
        $this->acQueue = Activityqueue::findOrFail(array_get($data, 'activityqueue_id', -1));
        $this->acQueue->start = date("Y-m-d H:i:s");
        $this->acQueue->job_id = $this->job->getJobId();
        $this->acQueue->job_type = $job_type;
        $this->acQueue->input_data = cupparis_json_encode($data);
        $this->acQueue->save();
        $queueId = $this->acQueue->getKey();
        $v = $this->acQueue->toArray();
        //echo "start\n";
        //print_r($v);
        $file = storage_path('files/queues/progress_' . $queueId);
        File::put($file,cupparis_json_encode($v));
    }

    protected function jobEnd($error = 0, $msg = "")
    {
        $this->acQueue->error = $error;
        $this->acQueue->msg = $msg;
        $this->acQueue->end = date("Y-m-d H:i:s");
        $this->acQueue->output_data = cupparis_json_encode($this->output_data);
        $this->acQueue->save();
        $file = storage_path('files/queues/progress_' . $this->acQueue->getKey());
        $v = $this->acQueue->toArray();

        $v['error'] = $error;
        $v['msg'] = $msg;
//		echo "end\n";
//		print_r($v);
        File::put($file,cupparis_json_encode($v));
        $this->job->delete();
    }

    protected function jobProgress($progress)
    {
        $this->acQueue->progress = $progress;
        $this->acQueue->save();
        $file = storage_path('files/queues/progress_' . $this->acQueue->getKey());
        $v = $this->acQueue->toArray();
        $v['progress'] = $progress;
//		echo "progress\n";
//		print_r($v);
        File::put($file,cupparis_json_encode($v));
    }
    // fine classe principale
}