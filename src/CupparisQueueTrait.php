<?php namespace Gecche\Cupparis\Queue;

use App\Http\Controllers\Controller;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Response;
use Exception;
use Illuminate\Support\Facades\Storage;


trait CupparisQueueTrait {

    public function getQueueFilename($jobId) {
        return Arr::get($this->config,'storage-folder') . '/' . 'progress_'.$jobId;
    }

    public function getQueueModelClassName() {
        return Arr::get($this->config,'model');
    }

}
