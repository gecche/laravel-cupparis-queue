<?php
/**
 * Created by PhpStorm.
 * User: pier
 * Date: 23/01/2019
 * Time: 16:04
 */


Route::group([
    'middleware' => ['api'],
    'prefix' => 'api',
], function () {

    $isApi = true;
    require __DIR__ . '/queue-routes.php';

});
