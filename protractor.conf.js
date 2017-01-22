var fs = require('fs');
var path = require('path');
var httpServer = require('http-server');

startHttpServer();

exports.config = {
  baseUrl: 'http://localhost:8080/',

  specs: [
    'test/**/*.e2e.js'
  ]
};


function startHttpServer() {
  var server = httpServer.createServer();
  server.listen(8080, function () {
    console.log('HTTP server started at http://localhost:8080');
  });
}
