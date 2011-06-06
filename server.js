var http = require('http');

function start(route, routes) {
    function onRequest(request, response) {

        request.addListener("end", function() {
            route(routes, request, response);
        });
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start;