<?php
$config = \Gecche\Cupparis\Queue\Facades\CupparisQueue::getConfig();

$queueNamespace = \Illuminate\Support\Arr::get($config, 'controller-namespace',"Gecche\\Cupparis\\Queue\\Http\\Controllers");
$queuePrefix = \Illuminate\Support\Arr::get($config, 'routes-prefix');
$queues = array_keys(\Illuminate\Support\Arr::get($config, 'queues', [
    'test' => \Gecche\Cupparis\Queue\Queues\TestQueue::class,
]));
$whereQueues = join("|", $queues);

Route::group([
    'namespace' => $queueNamespace,
    'prefix' => $queuePrefix,
    'middleware' => ['auth:sanctum']
], function () use ($queueNamespace,$queuePrefix,$whereQueues,$isApi) {


    //LIST
    Route::any("add/{queue}/{action?}",[$queueNamespace."\\".QueueController::class, 'queue_add'])
        ->name($isApi?'api.queue_add':'queue_add')
        ->where([
            'queue' => $whereQueues
        ]);

    Route::any("status/{id}",[$queueNamespace."\\".QueueController::class, 'status'])
        ->name($isApi?'api.queue_status':'queue_status');

});
