<?php namespace Gecche\Cupparis\Queue;

use Illuminate\Support\ServiceProvider;

class CupparisQueueServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('cupparis-queue', function ($app) {
            return new CupparisQueueManager(function () use ($app) {
                return call_user_func($app['auth']->userResolver());
            });
        });
    }


    public function boot()
    {
        $this->publishes([
            __DIR__ . '/config/cupparis-queue.php' => config_path('cupparis-queue.php'),
        ]);
    }

}
