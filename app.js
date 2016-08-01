var lyr = require('./lyrics.js');
// var http = require('http');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  var selection = Math.floor(Math.random() * lyr.length);
  res.send(lyr[selection]);
});

app.listen(3000, function() {
  console.log('Are we there yet?');
});

// var server = app.listen(3000, function() {
//   var host = server.address().address;
//   var port = server.address().port;
//
//   console.log('3000');
