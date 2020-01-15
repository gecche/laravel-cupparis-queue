<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Tradetracker import script') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/bootstrap-3.3.6-dist/css/bootstrap.min.css') }}" rel="stylesheet">

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


<div class="row">
    @if (session('status'))
        <div class="alert alert-success">
            {!! session('status') !!}
        </div>
    @endif
    @if (count($errors) > 0)
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</div>


@yield('content')



</div>

<!-- Scripts -->
<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('css/bootstrap-3.3.6-dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/cupparis3.js') }}"></script>

@yield('scripts')
</body>
</html>
