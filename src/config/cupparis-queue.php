<?php

return array(
    /*
      |--------------------------------------------------------------------------
      | Cupparis Queue
      |--------------------------------------------------------------------------
      |
      |
     */


    'controller-namespace' => "Gecche\\Cupparis\\Queue\\Http\\Controllers",
    'queues-namespace' => "App\\Queues",
    'model' => "Gecche\\Cupparis\\Queue\\Models\\ActivityQueue",

    'storage-folder' =>  'files/queues',
);

