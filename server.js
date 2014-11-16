var express = require('express');

var server = express();
server.set('port', 4000);
server.set('views', __dirname + '/public/views');
server.set('view engine', 'jade');
server.use(express.static(__dirname + '/public'));

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

server.listen(server.get('port'), function() {
  console.log('** server listening on http://:localhost:%s'
    , server.get('port'));
});
