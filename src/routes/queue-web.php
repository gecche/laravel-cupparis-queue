<?php
/**
 * Created by PhpStorm.
 * User: pier
 * Date: 23/01/2019
 * Time: 16:04
 */

$config = \Gecche\Cupparis\Queue\Facades\CupparisQueue::getConfig();

$namespace = \Illuminate\Support\Arr::get($config, 'controller-namespace');
$prefix = \Illuminate\Support\Arr::get($config, 'routes-prefix');
$queues = array_keys(\Illuminate\Support\Arr::get($config, 'queues', []));

Route::group([
    'namespace' => $namespace,
    'prefix' => $prefix,
    'middleware' => ['web']
], function () use ($queues) {

    $whereQueues = join("|", $queues);


    //LIST
    Route::any("add/{queue}/{action?}",
        [
            "as" => "queue_add",
            "uses" => "QueueController@add"
        ])->where([
        'queue' => $whereQueues
    ]);

    Route::any("status/{id}",
        [
            "as" => "queue_status",
            "uses" => "QueueController@status"
        ]);

//    Route::any("list/{type?}",
//        [
//            "as" => "queue_list",
//            "uses" => "QueueController@qlist"
//        ]);


});