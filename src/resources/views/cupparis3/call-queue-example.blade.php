<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Cupparis Queue Example</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <style>
        .overlay {
            background-color: rgba(1, 1, 1, 0.3);
            bottom: 0;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            z-index:10000;
        }
    </style>
</head>
<body>

<div class="container" style="margin:15px;">


    <div class="panel panel-primary">
        <div class="panel-heading">Esecuzione task</div>
        <div class="panel-body">
            <h4>Seleziona task da eseguire</h4>
            <form method="post" id="task">
                {{csrf_field()}}
                <input class="btn btn-primary" data-task="test" type="button" value="Esegui">
            </form>

        </div>
    </div>


</div>

<!-- Scripts -->
<script
        src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="{{ asset('cupparis/queue/js/cupparis3/cupparis3.js') }}"></script>
<script src="{{ asset('cupparis/queue/js/cupparis3/queuetask.js') }}"></script>


<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    QueueTask.setQueues({
        'add' : '/queue/add',
        'status' : '/queue/status',
    });

    $(function () {

        $('#task input[type=button]').click(function () {

            var jQel = $(this);

            var msg = "Eseguire il task? Non chiudere il browser fino al termine: potrebbe durare diversi minuti.";

            $.confirmDialog(msg).ok(function () {
                QueueTask.addQueue(jQel.data('task'));
            });

        })
    })
</script>
</body>
</html>
