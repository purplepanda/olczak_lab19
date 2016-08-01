var lyr = require('./lyrics.js');
var http = require('http');

http.createServer(function(request, response) {
  var selection = Math.floor(Math.random() * lyr.length);
  response.writeHead(200, {
    "Content-type": "text/plain"
  });
  response.write(lyr[selection]);
  response.end();
}).listen(8888);


// console.log(lyr[selection]);
