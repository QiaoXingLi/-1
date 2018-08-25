var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

	//to read simply:
	//res.write(req.url);
  
  //to get & split 

  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);

}).listen(8080);

//to test go to http://localhost:8080/?year=2017&month=July


