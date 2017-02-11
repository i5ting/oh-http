var http = require('http');

http.createServer(function(req, res){
  console.log(req);

  res.writeHead(200, {'content-type':'text/html'});
  res.write('<p>hi there!</p>');
  res.end()
}).listen(8888);