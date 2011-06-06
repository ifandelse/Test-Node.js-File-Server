var server = require('./server.js');
var router = require('./router.js');
var routes = require('./routes.js');

server.start(router.route, routes);