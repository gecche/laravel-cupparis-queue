<?php namespace Gecche\Cupparis\Queue\Listeners;

use Gecche\Cupparis\Queue\Events\JobProgress;
use Gecche\Cupparis\Queue\Facades\CupparisQueue;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\File;

class UpdateQueueOnJobProgress implements ShouldQueue {

	/**
	 * Create the event handler.
	 *
	 * @return void
	 */
	public function __construct()
	{
		//
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
        $acQueue->save();		//

        $filename = CupparisQueue::getQueueFilename($jobId);
        File::put($filename,cupparis_json_encode($acQueue->toArray()));
	}

}
