var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var path             = require( 'path' );
var args             = require( 'yargs' ).argv;

gulp.task( 'vet', function () {
  log( 'Analyzing source with JSHint and JSCS' );

  return gulp.src( config.jsToVet )
  .pipe( $.if( args.verbose, $.print()))
  .pipe( $.jscs({ configPath : '.jscsrc' }))
  .pipe( $.jshint( '.jshintrc' ))
  .pipe( $.jshint.reporter( 'jshint-stylish', { verbose: true }))
  .pipe( $.jshint.reporter( 'fail' ));
});

gulp.task( 'test', function ( done ) {
  log( 'Running tests' );

  startTests( true, done );
});

gulp.task( 'autotest', function ( done ) {
  log( 'Running tests continuously' );

  startTests( false, done );
});

// Experimental
gulp.task( 'test-server', function () {
  log( 'Running tests for backend' );
  log( '*** Warning. Still experimental ***' );

  // TODO: move to gulp-config
  return gulp.src( 'back/app/**/*.spec.js', { read : false })
    .pipe( $.mocha({
      reporter : 'spec',
      globals  : {
        should : require( 'should' )
      }
    }))
    .on( 'error', $.util.log );
});

gulp.task( 'watch-test-server', function () {
  log( 'Running tests for backend and watching for file changes' );
  log( '*** Warning. Still experimental ***' );

  return gulp.watch(
    // TODO: move to gulp-config
    [ 'back/app/**/*.js' ],
    [ 'test-server' ]);
});

///////////////////////

function startTests ( singleRun, done ) {
  var karma = require( 'karma' ).server;
  var excludeFiles = [];
  //var serverTests = config.serverIntegrationTests; //TODO

  //excludeFiles = serverTests;

  karma.start({
    configFile : path.join( __dirname, '../', config.karmaConfig ),
    exclude    : excludeFiles,
    singleRun  : Boolean( singleRun )
  }, karmaCompleted );

  function karmaCompleted ( karmaResult ) {
    log( 'karma completed' );
    if ( karmaResult === 1 ) {
      done( 'karma tests failed with code: ' + karmaResult );
    } else {
      done();
    }
  }
}
