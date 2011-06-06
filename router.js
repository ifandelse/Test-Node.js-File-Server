var url = require('url');

function route(routes, request, response) {
    var path = url.parse(request.url).pathname,
        qryStr = url.parse(request.url, true);
    if(!path.match(/favicon.ico/i)) {
        if(typeof routes[path] === 'function') {
            routes[path](response, qryStr);
        }
        else {
            response.writeHead(404, {"Content-Type" : "text/html"});
            response.write("404 Not found.");
            response.end();
        }
    }
}

exports.route = route;
