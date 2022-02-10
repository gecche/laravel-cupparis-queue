

var QueueTask = Class.extend({

    routes : {
      'add' : '/queue/add',
      'status' : '/queue/status',
    },
    queues : ['test'],

    waitMsg: "Attendere prego",
    successMsg: null,

    init : function (queues,routes) {
        if (queues) {
            this.queues = queues;
        }
        if (routes) {
            this.routes = routes;
        }
    },

    setRoutes: function (routes) {
        this.routes = routes;
    },

    setQueues: function (queues) {
        this.queues = queues;
    },

    addQueue: function (type) {

        var self = this;

        if($.inArray("test", self.queues) == -1) {
            $.errorDialog("Task non definito");
        }

        self.successMsg = "Task " + type + " eseguito con successo";

        var addUrl = self.routes.add + '/' + type;
        var params = $('#task').serializeAssoc();

        $.post(addUrl, params, function (json) {
            if (json.error) {
                $.errorDialog(json.msg);
                return;
            }
            $.waitStart(self.waitMsg);
            self._waitQueue(json.jobId, function (json) {
                self._addQueueCallback(json);
            });
        });


    },

    _addQueueCallback: function (json) {
        var self = this;
        if (json.error) {
            $.errorDialog(json.msg);
            return;
        }
        if (json.job.error) {
            $.errorDialog(json.job.msg);
            return;
        }
        $.messageDialog(self.successMsg);
    },

    _waitQueue: function (jobId, callback) {
        var self = this;
        $.post('/'+self.routesPrefix+'/status/' + jobId, function (json) {
            console.log('json');
            try {
                if (json.error) {
                    $.waitEnd();
                    if (callback) {
                        callback(json);
                    } else {
                        $.errorDialog(json.msg);
                    }
                    return;
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
                    return;
                }

                setTimeout(function () {
                    self._waitQueue(jobId, callback);
                }, 2000);
            } catch (e) {
                $.waitEnd();
                if (callback) {
                    callback({error: 1, msg: e.message});
                } else {
                    $.errorDialog(e.message);
                }
            }
        })
    }
});

