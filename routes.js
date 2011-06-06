var handlers = require('./handlers.js');

var routes = {};
routes["/"] = handlers.root;
routes["/file"] = handlers.getFile;

for(var key in routes) {
    exports[key] = routes[key];
}
