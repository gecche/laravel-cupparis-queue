<?php namespace Gecche\Cupparis\Queue;

use App;
use Gecche\Multidomain\Foundation\Console\ListDomainCommand;
use Gecche\Multidomain\Foundation\Console\RemoveDomainCommand;
use Illuminate\Support\ServiceProvider;
use Gecche\Multidomain\Foundation\Console\DomainCommand;
use Gecche\Multidomain\Foundation\Console\AddDomainCommand;
use Gecche\Multidomain\Foundation\Console\UpdateEnvDomainCommand;

class CupparisQueueServiceProvider extends ServiceProvider
{

    public function boot()
    {
        $this->publishes([
            __DIR__ . '/config/cupparis-queue.php' => config_path('cupparis-queue.php'),
        ]);
    }

}
