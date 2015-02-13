var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var args             = require( 'yargs' ).argv;
var runSequence      = require( 'run-sequence' );
var browserSync      = require( 'browser-sync' );
var port             = process.env.PORT || config.nodeServerDefaultPort;

gulp.task( 'serve-dev', [ 'build-dev' ], function () {
  log( 'Serving dev' );

  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesDev()
  );
});

gulp.task( 'serve-debug-build', [ 'build-debug' ], function () {
  log( 'Serving debug-build' );

  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'build-debug' )
  );
});

gulp.task( 'serve-build', [ 'build' ], function () {
  log( 'Serving build' );

  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'build' )
  );
});

gulp.task( 'serve-production-build', [ 'build-production' ], function () {
  log( 'Serving production build' );

  serve(
    config.nodeEnvironments.production,
    getBrowserSyncWatchesBuild( 'build-production' )
  );
});

////////////////

function getBrowserSyncWatchesDev () {
  return {
    gulpWatch             : function browserSyncWatchTask () {
      gulp.watch( config.styles, [ 'styles' ])
        .on( 'change', function ( event ) {
          changeEvent( event );
        });

      gulp.watch( config.html, [ 'html' ])
        .on( 'change', function ( event ) {
          changeEvent( event );
        });
    },
    browserSyncWatchFiles : config.browserSyncFilesDev
  };
}

function getBrowserSyncWatchesBuild ( buildTaskName ) {
  return {
    gulpWatch             : function browserSyncWatchTask () {
      gulp.watch( config.gulpWatchFilesBuild, function () {
        runSequence(
          buildTaskName,
          function () {
            browserSync.reload();
          }
        );
      })
        .on( 'change', function ( event ) {
          changeEvent( event );
        });
    },
    browserSyncWatchFiles : []
  };
}

function serve ( nodeEnv, browserSyncWatches ) {
  var nodeOptions = {
    script    : config.nodeServerStartScript,
    delayTime : 1,
    env       : {
      PORT     : port,
      NODE_ENV : nodeEnv
    },
    watch     : config.backendFilesToWatch
  };

  var rerunTasksOnRestart = [];

  return $.nodemon( nodeOptions )
    .on( 'restart', rerunTasksOnRestart, function ( event ) {
      log( '*** nodemon restarted ***' );
      log( 'files changed on restart:\n' + event );
      setTimeout( function () {
        browserSync.notify( 'reloading now ...' );
        browserSync.reload({ stream : false });
      }, config.browserSyncReloadDelay );
    })
    .on( 'start', function () {
      log( '*** nodemon started ***' );
      startBrowserSync( browserSyncWatches );
    })
    .on( 'crash', function () {
      log( '*** nodemon crashed: script crashed for some reason ***' );
    })
    .on( 'exit', function () {
      log( '*** nodemon exited gracefully ***' );
    });
}

function startBrowserSync ( browserSyncWatches ) {
  if ( args.nosync || browserSync.active ) {
    return;
  }

  log( 'Starting browser-sync on port ' + port );

  browserSyncWatches.gulpWatch();

  var options = {
    proxy          : 'localhost:' + port,
    port           : 5000,
    files          : browserSyncWatches.browserSyncWatchFiles,
    ghostMode      : {
      clicks   : true,
      location : false,
      forms    : true,
      scroll   : true
    },
    injectChanges  : true,
    logFileChanges : true,
    logLevel       : 'debug',
    logPrefix      : 'ng-next',
    notify         : true,
    reloadDelay    : 1000,
    online         : false
  };

  browserSync( options );
}

function changeEvent ( event ) {
  var srcPattern = new RegExp( '/.*(?=/' + config.frontend + ')/' );
  log( 'File ' + event.path.replace( srcPattern, '' ) + ' ' + event.type );
}
