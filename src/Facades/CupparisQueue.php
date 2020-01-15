<?php namespace Gecche\Cupparis\Menus\Facades;

use Illuminate\Support\Facades\Facade;
/**
 * @see \Illuminate\Filesystem\Filesystem
 */
class CupparisQueue extends Facade {

	/**
	 * Get the registered name of the component.
	 *
	 * @return string
	 */
            protected static function getFacadeAccessor() { return 'cupparis-queue'; }

}
