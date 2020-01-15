<?php namespace Gecche\Cupparis\Queue\Http\Controllers;

use App\Http\Controllers\Controller;

use Gecche\Cupparis\Queue\CupparisQueueTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Response;
use Exception;
use Illuminate\Support\Facades\Storage;


class QueueController extends Controller {

    use CupparisQueueTrait;

    protected $config = null;

    public function __construct() {

        $this->config = Config::get('cupparis-queue',[]);

    }

    public function add($queue, $action = null) {
        try {

            $queue_class = Arr::get($this->config,'queues-namespace') . "\\" . studly_case($queue) . "Queue" . ($action ? "@$action" : "");
            $this->result['msg'] = "created $queue_class ";
            $data = Input::all();
            $data['userId'] = 1;

            $queueModelName = Arr::get($this->config,'model');
            $activityQueue = $queueModelName::create([
                'user_id' => $data['userId'],
            ]);

            $data['activityqueue_id'] = $activityQueue->getKey();
            $this->result['jobId'] = $data['activityqueue_id'];
            $filename = $this->getQueueFilename(result['jobId']);
//            Log::info("JOB ADDDDD:");
            Storage::put($filename, cupparis_json_encode([]));
            Queue::push($queue_class, $data);
        } catch (Exception $e) {
            $this->result['error'] = 1;
            $this->result['msg'] = $e->getMessage();
        }
        return Response::json($this->result);
    }

    public function status($id) {
        $this->result['job'] = array();
        try {
            // modello tabella queue
            /*
            $aQueue = new Activityqueue();
            $job = $aQueue->where("job_id", $id)->get();
            if (count($job) > 0) {
                $this->result['job'] = $job[0]->toArray();
            }
            */
            // alcune volte il file potrebbe non essere ancora stato creato
            $max_retry  = 15;
            $stop = false;
            $retry = 0;
            while (!$stop && ($retry < $max_retry)) {
                sleep(1);
                $retry++;
                $s = Storage::get($this->getQueueFilename($id));
                if ($s) {
                    $stop = true;
                    $s1 = json_decode($s);
                    $this->result['job'] = $s1;
                } 
            }
            




        } catch (\Exception $e) {
            $this->result['error'] = 1;
            $this->result['msg'] = $e->getMessage();
        }
        return Response::json($this->result);
    }

    public function remove($id) {
        // TODO rimozione lavoro in coda
        $this->result['error'] = 1;
        $this->result['msg'] = "Non ancora implementato";
        return Response::json($this->result);
    }

//    public function qlist($type = null) {
//        return Response::json($this->result);
//    }

}
