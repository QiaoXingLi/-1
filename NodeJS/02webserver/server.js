//calling ndoe modules

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

//mimeTypes is declared as a contant array of types of files
//that our server would support

const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

//creating a server with request & response

http.createServer(function(req, res){

    var uri = url.parse(req.url).pathname;

    //process.cwd() method returns the current working directory of the Node.js process.
    //unescape() converts HTML entities to HTML characters, e.g. &amp; converts to &
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('Loading ' + uri);


    var stats; //stores requested filename
    
    //try-catch to return 404 if the requested file is not present in the server
    try {
        stats = fs.lstatSync(fileName);
    } catch (e) {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
        return;
    }

    //check if the requested filename is a file or a directory
    if(stats.isFile()) 
    {
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type': mimeType});

        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } 

    else if (stats.isDirectory()) 
    {
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    } 

    //if not file or directory then Internal Error
    else 
    {
        res.writeHead(500, {'Content-type': 'text/plain'});
        res.write('500 Internal Error\n');
    }
}).listen(3000);  //port: 3000
//hosting the file server in localhost:3000