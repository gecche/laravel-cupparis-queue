@extends('layouts.app')

@section('content')
    <div class="panel panel-primary">
        <div class="panel-heading">Esecuzione task</div>
        <div class="panel-body">
            <h4>seleziona task da eseguire</h4>
            <form method="post" id="task">
                {{csrf_field()}}
                <div>
                    <input type="radio" name="task" value="anagrafica" checked>Anagrafica
                </div>
                <br/>
                <input class="btn btn-primary" data-task="anagrafica" type="button" value="Esegui">
                <hr/>
                <div>
                    <input type="radio" name="task" value="fatturazione">Fatturazione

                    <h5>Date di esportazione fatture (da - a con il giorno finale ESCLUSO)</h5>
                    Giorno iniziale <input type="date" name="datada" value="{{$datada}}">
                    Giorno finale <input type="date" name="dataa" value="{{$dataa}}">
                </div>
                <br/>
                <input class="btn btn-primary" data-task="fatture" type="button" value="Esegui">

            </form>

        </div>
    </div>
@endsection


@section('scripts')


    <script>

        var QueueTask = {

            waitMsg : "Attendere prego",
            successMsg : null,

            _addQueue : function(type) {

                var self = this;


                if (type != 'anagrafica' && type != 'fatture' && type != 'test') {
                    $.errorDialog("Task non definito");
                }

                self.successMsg = "Task " + type + " eseguito con successo";

                var addUrl = '/queue/add/'+type;
                var params = $('#task').serializeAssoc();

                $.post(addUrl,params,function (json) {
                    console.log('json add');
                    if (json.error ) {
                        $.errorDialog(json.msg);
                        return ;
                    }
                    console.log('json add 2');
                    $.waitStart(self.waitMsg);
                    console.log('json add 3');
                    self._waitQueue(json.jobId, function(json) {
                        self._addQueueCallback(json);
                    });
                });



            },
            _addQueueCallback : function (json) {
                var self = this;
                if (json.error) {
                    $.errorDialog(json.msg);
                    return ;
                }
                if (json.job.error) {
                    $.errorDialog(json.job.msg);
                    return ;
                }
                $.messageDialog(self.successMsg);
            },
            _waitQueue : function (jobId,callback) {
                var self =  this;
                $.post('/queue/status/'+jobId,function (json) {
                    console.log('json');
                    try {
                        if (json.error) {
                            $.waitEnd();
                            if (callback) {
                                callback(json);
                            } else {
                                $.errorDialog(json.msg);
                            }
                            return ;
                        }
                        if (json.job.end) {
                            $.waitEnd();
                            if (callback) {
                                callback(json);
                            } else {
                                if (json.job.error) {
                                    $.errorDialog(json.job.msg);
                                }
                            }
                            return ;
                        }

                        setTimeout(function () {
                            self._waitQueue(jobId,callback);
                        },2000);
                    } catch (e) {
                        $.waitEnd();
                        if (callback) {
                            callback({error:1,msg:e.message});
                        } else {
                            $.errorDialog(e.message);
                        }
                        return ;
                    }
                    return ;


                })
            }
        }




    </script>

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $(function () {
            console.log('here');
            $('input[name="datada"],input[name="dataa"]').change(function () {
                console.log('herech');
                $("#taskfat").prop("checked", true);
            });

            $('#task input[type=button]').click(function () {

                var jQel = $(this);
                console.log(jQel.data('task'));
                var msg = "Eseguire il task? Non chiudere il browser fino al termine: potrebbe durare diversi minuti.";
                $.confirmDialog(msg).ok(function () {
                    //QueueTask._addQueue('test');
                    QueueTask._addQueue(jQel.data('task'));
                });

            })
        })

    </script>
@endsection