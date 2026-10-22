<?php
/**
 * Created by PhpStorm.
 * User: pier
 * Date: 23/01/2019
 * Time: 16:04
 */


Route::group([
    'middleware' => ['web']
], function () {

    $isApi = false;
    $webMiddlewares = config('cupparis-queue.web_middlewares',['auth:sanctum']);
    require __DIR__ . '/queue-routes.php';

});
