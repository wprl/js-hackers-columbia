// ---- Dependencies ----
var http       = require('http');
var path       = require('path');
var express    = require('express');
var config     = require('config');

// ---- Private variables ----
var app = express();

// ---- Configure Express ----
app.configure(function(){
  app.set('port', process.env.PORT || 3456);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(function(err, request, response, next){
    // TODO error handlers
  });
});

app.configure('development', function () {
  app.use(express.errorHandler());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', function () {
  app.use(express.static(path.join(__dirname, 'public'))); // TODO move static files to Amazon S3 or other static file server
});

// ---- Start Server ---- //
http.createServer(app).listen(app.get('port'), function () {
  if (app.settings.env === 'development') console.log('Express server listening on port ' + app.get('port'));
});
