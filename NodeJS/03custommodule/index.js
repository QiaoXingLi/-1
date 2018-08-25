var http = require('http');

//calling my custom module which exports date()
var dt = require('./akashModule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
   
    res.write("The date and time are now: " + dt.myDateTime()); //myDateTime was exported from dt

    res.end();
}).listen(8080);
console.log('Code running @ http://localhost:8080');

