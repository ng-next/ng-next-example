var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require( '../tasks/gulp-config' )();
var path = require( 'path' );
//var fs = require( 'fs' );
var express = require( 'express' );
var logger = require( 'morgan' );
var app = express();

app.set( 'port', process.env.PORT || config.nodeServerDefaultPort );
app.use( logger( 'dev' ));

if ( app.get( 'env' ) === 'development' ) {
  app.use( express.static( path.join( __dirname, '../front/main' )));
  app.use( '/test-doubles', express.static(
    path.join( __dirname, '../front/test/unit/test-doubles' )));
} else {
  app.use( express.static( path.join( __dirname, '../public' )));
  app.use( '/lib', express.static(
    path.join( __dirname, '../front/main/lib' )));
}

///**
// * ERROR HANDLING
// */
///// catch 404 and forwarding to error handler
app.use( function ( req, res, next ) {
  var err = new Error( 'Not Found' );
  err.status = 404;
  next( err );
});

///// error handlers
//
//// development error handler
//// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
  app.use( function ( err, req, res ) {
    res.status( err.status || 500 );
    res.render( 'error', {
      message : err.message,
      error   : err
    });
  });
}

//// production error handler
//// no stacktraces leaked to user
app.use( function ( err, req, res ) {
  res.status( err.status || 500 );
  res.render( 'error', {
    message : err.message,
    error   : {}
  });
});

app.listen( app.get( 'port' ), function () {
  console.log( 'Express server listening in env ' + env +
    ' on port ' + app.get( 'port' ));
});
