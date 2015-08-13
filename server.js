var express = require('express');

var server = express();
server.set('views', __dirname + '/public/jade');
server.set('view engine', 'jade');

server.get('/', function(req, res) {
  res.render('index');
});

server.use(function(req, res) {
  res.status(404).send('Not Found');
});

server.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

server.listen(4000, function() {
  console.log('** http://localhost:%s', 4000);
});
