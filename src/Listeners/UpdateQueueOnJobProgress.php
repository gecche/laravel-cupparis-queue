<?php namespace Gecche\Cupparis\Queue\Listeners;

use Gecche\Cupparis\Queue\Events\JobProgress;
use Gecche\Cupparis\Queue\Facades\CupparisQueue;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UpdateQueueOnJobProgress implements ShouldQueue {


    public $queue = 'progress';

	/**
	 * Create the event handler.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * Handle the event.
	 *
	 * @param  JobProgress  $event
	 * @return void
	 */
	public function handle(JobProgress $event)
	{
	    $jobId = $event->jobId;
        $queueModelName = CupparisQueue::getQueueModelClassName();

        $acQueue = $queueModelName::find($jobId); //new Activityqueue ();
        $acQueue->progress = $event->progress;
//        echo $event->progress;
        $acQueue->save();		//

        $filename = CupparisQueue::getQueueFilename($jobId);
        Storage::put($filename,cupparis_json_encode($acQueue->toArray()));
	}

}
