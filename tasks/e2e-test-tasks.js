// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

// supportive resources:
// http://sauceio.com/index.php/2015/03/repost-angular-protractor-sauce-connect-
// launched-from-gulp-all-behind-a-corporate-firewall/
// https://github.com/mllrsohn/gulp-protractor

var protractorManualTaskName = 'protractor-run-pure';
var config = require( './gulp-config' )();
var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )({ lazy : true });
var path = require( 'path' );
var childProcess = require( 'child_process' );
var webdriverStandalone = require( 'gulp-protractor' ).webdriver_standalone;
require( 'gulp-help' )( gulp );
var log = require( './nn-gulp-utils' ).log;
var SauceTunnel = require( 'sauce-tunnel' );
var webdriver_update = $.protractor.webdriver_update;
var tunnel;

// TODO checkout if really needed for CI
//var args = require( 'yargs' ).argv;
//var express = require( 'express' );
//var http = require( 'http' );
//var server;
//var isCI = args.type === 'ci';
//
//if ( !isCI ) {
//server = http.createServer( express().use( express.static( config.public )));
//}
////else { // dev really needed? // }

gulp.task( 'webdriver-standalone', webdriverStandalone );

gulp.task( 'webdriver-update', webdriver_update );

//-local ??
//, [ 'e2e-server' ]
gulp.task( 'protractor-run', function ( done ) {
  gulp.src( config.e2eScenarios, { read : false } )
    .pipe( $.protractor.protractor({
      configFile : config.protractorLocalConfig
      //,
      //args       : [ '--baseUrl', 'http://127.0.0.1:8000' ]
    }))
    .on( 'error', function ( error ) {
      throw error;
    })
    .on( 'end', done );

  // TODO checkout if really needed for CI
  //.on( 'error', function ( error ) {
  //  server.close();
  //
  //  if ( isCI ) {
  //    throw error;
  //  } else {
  //    console.log( error );
  //  }
  //  done();
  //}).on( 'end', function () {
  //  server.close();
  //  done();
  //});
});

gulp.task( 'protractor-sauce-run', function ( done ) {
  log( 'IMPORTANT: Remember to set SAUCE_USERNAME and SAUCE_ACCESS_KEY as' +
    ' environment variables!. Otherwise local capabilities will be used.' );

  gulp.src( config.e2eScenarios, { read : false } )
    .pipe( $.protractor.protractor({
      configFile : config.protractorSauceConfig
    }))
    .on( 'error', function ( error ) {
      throw error;
    })
    .on( 'end', done );
});

gulp.task( 'protractor-install', function ( done ) {
  childProcess.spawn( getProtractorBinary( 'webdriver-manager' ), [ 'update' ],
    { stdio : 'inherit' }
  ).once( 'close', done );
});

gulp.task( protractorManualTaskName, function ( done ) {
  // forward args to protractor
  var argv = process.argv.slice( getProtractorArgsIndex(  process.argv ));
  argv.push( config.protractorConfig );

  childProcess.spawn( getProtractorBinary( 'protractor' ), argv,
    { stdio : 'inherit' }
  ).once( 'close', done );
});

gulp.task( 'elementor-run', function ( done ) {
  gulp.start( 'webdriver-standalone' );

  setTimeout( function () {
    childProcess.spawn( getElementorBinary( 'elementor.js' ),
      [ 'http://127.0.0.1:' + config.nodeServerDefaultPort ],
      { stdio : 'inherit' }
    ).once( 'close', done );
  }, 1000 );
});

//gulp.task( 'e2e-server', 'starts a development webserver', function ( done ) {
//  server.listen( process.env.PORT || config.nodeServerDefaultPort, done );
//});

gulp.task( 'sauce-start', function ( cb ) {
  tunnel = new SauceTunnel(
    process.env.SAUCE_USERNAME,
    process.env.SAUCE_ACCESS_KEY,
    'askl34bsdvfvtyui345gv8' );

  // >>>> Enhance logging
  var methods = [ 'write', 'writeln', 'error', 'ok', 'debug' ];
  methods.forEach( function ( method ) {
    tunnel.on( 'log:' + method, function ( text ) {
      console.log( method + ': ' + text );
    });
    tunnel.on( 'verbose:' + method, function ( text ) {
      console.log( method + ': ' + text ) ;
    });
  });
  // <<<< End enhance logging

  tunnel.start( function ( isCreated ) {
    if ( !isCreated ) {
      cb( 'Failed to create Sauce tunnel.' );
    }
    console.log( 'Connected to Sauce Labs.' );
    cb();
  });
});

// results in "tunnel is undefined"
// TODO further investigation needed
//gulp.task( 'sauce-end', function ( cb ) {
//  tunnel.stop( function () {
//    cb();
//  });
//});

////////////////////////

function getProtractorArgsIndex ( args ) {
  for ( var i = 0; i < args.length; i = i + 1 ) {
    if ( args[ i ] === protractorManualTaskName ) {
      return i + 1;
    }
  }
  return -1;
}

function getProtractorBinary ( binaryName ) {
  var winExt = /^win/.test( process.platform ) ? '.cmd' : '';
  var pkgPath = require.resolve( 'protractor' );
  var protractorDir = path.resolve( path.join( path.dirname( pkgPath ), '..',
    'bin' ));
  return path.join( protractorDir, '/' + binaryName + winExt );
}

function getElementorBinary ( binaryName ) {
  var winExt = /^win/.test( process.platform ) ? '.cmd' : '';
  var pkgPath = require.resolve( 'elementor' );
  var protractorDir = path.resolve( path.join( path.dirname( pkgPath ), '..',
    'bin' ));
  return path.join( protractorDir, '/' + binaryName + winExt );
}

//
//// Start the standalone selenium server
//// NOTE: This is not needed if you reference the
//// seleniumServerJar in your protractor.conf.js
//gulp.task('webdriver_standalone', webdriver_standalone);
//
//
//// Setting up the test task
//gulp.task('protractor', ['webdriver_update'], function(cb) {
//    gulp.src(['example_spec.js']).pipe(protractor({
//        configFile: 'protractor.conf.js',
//    })).on('error', function(e) {
//        console.log(e)
//    }).on('end', cb);
//});
