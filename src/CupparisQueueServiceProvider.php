<?php namespace Gecche\Cupparis\Queue;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class CupparisQueueServiceProvider extends ServiceProvider
{

    protected $config;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->config = Config::get('cupparis-queue',[]);
        $this->app->singleton('cupparis-queue', function ($app) {
            return new CupparisQueueManager($this->config, function () use ($app) {
                return call_user_func($app['auth']->userResolver());
            });
        });
    }


    public function boot()
    {
        $this->publishes([
            __DIR__ . '/config/cupparis-queue.php' => config_path('cupparis-queue.php'),

            __DIR__ . '/resources/assets' => public_path('cupparis/queue'),
        ]);

        $this->loadRoutesFrom(__DIR__.'/routes/queue-web.php');

    }

}
