<?php

namespace Gecche\Cupparis\Queue;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;


class CupparisQueueManager {

    use CupparisQueueTrait;
    //protected $acl = null;
    // Array dei menu di un user

    protected $config = null;

    protected $userResolver = null;

    protected $result = [];

    /**
     * Loads Session and configuration options.
     *
     * @return  void
     */
    public function __construct(array $config, callable $userResolver) {//AclManager $acl) {
        // Save the config in the object

        $this->userResolver = $userResolver;
        $this->config = $config;

    }

    public function getConfig() {
        return $this->config;
    }

    public function add(string $queue, string $action = null, $inputData = []) {


        $queues = Arr::get($this->config,'queues',[]);

        $queueClass = Arr::get($queues,$queue,false);

        if (!$queueClass) {
            return [
                'error' => 1,
                'msg' => 'Cupparis queue non definita',
            ];
        }

        $this->setStandardResult();
        try {

            $job = $queueClass . ($action ? "@$action" : "");
            $this->result['msg'] = "created " . $job;

            $data = $inputData;

            $user = $this->resolveUser();

            $userId = 1;
            if ($user && $user->getKey()) {
                $userId = $user->getKey();
            }
            $data['userId'] = $userId;

            $queueModelName = Arr::get($this->config,'model');
            $activityQueue = $queueModelName::create([
                'user_id' => $data['userId'],
            ]);

            $data['activityqueue_id'] = $activityQueue->getKey();
            $this->result['jobId'] = $data['activityqueue_id'];
            $filename = $this->getQueueFilename($this->result['jobId']);
//            Log::info("JOB ADDDDD: " . $job);
            Storage::put($filename, cupparis_json_encode([]));
            Queue::push($job, $data);
        } catch (\Exception $e) {
            $this->result['error'] = 1;
            $this->result['msg'] = $e->getMessage();
        }
        return $this->result;
    }

    public function status($id) {
        $this->setStandardResult();
        $this->result['job'] = [];
        try {
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
        return $this->result;
    }

    public function remove($id) {
        // TODO rimozione lavoro in coda
        $this->result['error'] = 1;
        $this->result['msg'] = "Non ancora implementato";
        return $this->result;
    }


    /**
     * Resolve the user from the user resolver.
     *
     * @return mixed
     */
    protected function resolveUser()
    {
        return call_user_func($this->userResolver);
    }


    protected function setStandardResult() {
        $this->result = [
            'msg' => null,
            'error' => 0,
        ];
    }
}


