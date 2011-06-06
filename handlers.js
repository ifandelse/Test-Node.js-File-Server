var fs = require('fs');
var dirlist = require('./dirlist.js');

function root(response, qryStr) {
    var dirName = qryStr.query.dirName || "./";
    dirlist.readDirectory(dirName, function(data){
        var uglyStr = "";
        for(var f in data) {
            if(f.substring(0,1) !== '.'){
                var newDir = dirName === "./" ? dirName : dirName + "/";
                if(data[f] !== null && data[f].message && data[f].message.match(/EISDIR/)) {
                    uglyStr += "<li><a href='/?dirName=" + newDir + f + "'>" + newDir + f + "</a></li>";
                }
                else {
                    uglyStr += "<li><a href='/file?fileName=" + newDir + f + "' >" + f + "</a></li>";
                }
            }
        }
        var body =  '<html>'+
                    '<head>'+
                    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
                    '</head>'+
                    '<body>'+
                    '<h3>File Listing: ' + dirName + '</h3>' +
                    '<ul>' + uglyStr + '</ul>' +
                    '</body>'+
                    '</html>';

            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(body);
            response.end();
    });
}

function getFile(response, qryStr) {
    var fileName = qryStr.query.fileName;
    if(fileName) {
        response.writeHead(200, {
                    "Content-Type": "application/octet-stream",
                    "Content-Transfer-Encoding": "binary",
                    "Content-Disposition": "attachment; filename=\""+ fileName + "\""
                });
        var stream = fs.createReadStream(fileName);
        stream.on('end', function(){
           response.end();
           console.log("Request ended: " + fileName);
        });
        stream.on('error', function() {
           response.writeHead(404);
           response.end();
        });
        stream.pipe(response, {end:false});
    }
}

exports.root = root;
exports.getFile = getFile;