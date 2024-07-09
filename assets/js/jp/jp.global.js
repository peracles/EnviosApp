jp.global = (function (jp) {
    var global = jp.global || {};

    global.spinner = function(){};

    global.modal = function(){};

    global.get = function(url, data){
        var settings = {};
        settings.url = url;
        settings.cache = false;
        settings.data = data;
        settings.timeout = 6000;

        return $.get(settings).then(
            function (response){
                return response;
            });
    }

    global.post = function(url, data){
        return $.post(url, data).then(
            function (response){
                return response;
            });
    };

    global.put = function(url, data){
        return $.ajax({
            url: url,
            method: 'PUT',
            data: data
        }).then(
            function (response){
                return response;
            }
        );
    };

    global.destroy = function(url){
        return $.ajax({
            url: url,
            method: 'DELETE'
        }).then(
            function (response){
                return response;
            }
        );
    };

    return global;
})(jp);