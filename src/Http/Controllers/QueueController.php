<?php namespace Gecche\Cupparis\Queue\Http\Controllers;

use App\Http\Controllers\Controller;

use Gecche\Cupparis\Queue\Facades\CupparisQueue;
use Illuminate\Support\Facades\Response;


class QueueController extends Controller {

    public function add($queue, $action = null) {
        $result = CupparisQueue::add($queue,$action);
        return Response::json($result);
    }

    public function status($id) {
        $result = CupparisQueue::status($id);
        return Response::json($result);
    }

}
