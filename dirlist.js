var fs = require('fs');

function readDirectory(path, next) {
    fs.readdir(path, function(err, files) {
        var count = files.length,
            results = {};
        files.forEach(function(filename) {
            fs.readFile(filename, function(data){
                results[filename] = data;
                count--;
                if(count <= 0) {
                    next(results);
                }
            });
        });
    });
}

exports.readDirectory = readDirectory;