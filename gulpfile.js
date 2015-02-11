/* jshint node: true */

var gulp             = require( 'gulp' );
var args             = require( 'yargs' ).argv;
var config           = require( './gulp.config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var del              = require( 'del' );
var runSequence      = require( 'run-sequence' );
var browserSync      = require( 'browser-sync' );
var port             = process.env.PORT || config.nodeServerDefaultPort;

  /*
   * Code Style, Code Quality
   */

gulp.task( 'vet', function () {
  log( 'Analyzing source with JSHint and JSCS' );

  return gulp.src( config.jsToVet )
  .pipe( $.if( args.verbose, $.print()))
  .pipe( $.jscs({ configPath : '.jscsrc' }))
  .pipe( $.jshint( '.jshintrc' ))
  .pipe( $.jshint.reporter( 'jshint-stylish', { verbose: true }))
  .pipe( $.jshint.reporter( 'fail' ));
});

  /*
   * Styles
   */

gulp.task( 'clean-styles', function ( done ) {
  log( 'Cleaning style build files' );

  var files = [
    config.buildFolder + '*.css',
    config.buildFolder + '*.css.map',
    config.frontendApp + '**/*.css',
    config.frontendApp + '**/*.css.map'
  ];
  clean( files, done );
});

gulp.task( 'styles', [ 'clean-styles' ], function () {
  log( 'Compiling sass --> css, Autoprefixing css' );

  return gulp.src( config.mainStyle )
  .pipe( $.plumber())
  .pipe( $.rename( config.stylesBuildFile ))
  .pipe( $.sass( config.sassOptions ))
  //.pipe( $.csso()) //not needed anymore as systemjs-builder compresses css
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( gulp.dest( config.buildFolder ));
});

gulp.task( 'styles-debug', [ 'clean-styles' ], function () {
  log( 'Compiling sass --> css (with sourcemaps), Autoprefixing css' );

  return gulp.src( config.mainStyle )
  .pipe( $.plumber())
  .pipe( $.rename( config.stylesBuildFile ))
  .pipe( $.sourcemaps.init())
  .pipe( $.sass( config.sassOptions ))
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( $.sourcemaps.write( './' ))
  .pipe( gulp.dest( config.buildFolder ));
});

//gulp.task( 'sass-watcher', function () {
//  gulp.watch( config.styles, [ 'styles' ]);
//});

  /*
   * Build / Bundle js, html
   */

gulp.task( 'clean-js', function ( done ) {
  log( 'Cleaning javascript build files' );

  clean( config.jsBuildFiles, done );
});

gulp.task( 'bundle', [ 'unbundle' ], $.shell.task([
  'jspm bundle ' + config.jspmLibsToBundle + ' ' + config.jsBuildLibFile +
    ' --skip-source-maps',
  'jspm bundle main ' + config.jspmLibsToSubtract + ' ' +
    config.jsBuildMainFile + ' --skip-source-maps'
  ], { cwd : config.absolutePathToFrontend })
);

gulp.task( 'bundle-debug', [ 'unbundle' ], $.shell.task([
  'jspm bundle ' + config.jspmLibsToBundle + ' ' + config.jsBuildLibFile,
  'jspm bundle main ' + config.jspmLibsToSubtract + ' ' + config.jsBuildMainFile
  ], { cwd : config.absolutePathToFrontend })
);

gulp.task( 'unbundle', $.shell.task(
  [ 'jspm unbundle' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'minify', function () {
  log( 'Minifying (ngAnnotating and uglifying) javascript files' );

  var appJsFilter = $.filter( config.jsBuildMainFile );

  return gulp.src([
    config.frontend + config.jsBuildMainFile,
    config.frontend + config.jsBuildLibFile
  ])
  .pipe( appJsFilter )
  .pipe( $.ngAnnotate( config.ngAnnotateOptions ))
  .pipe( appJsFilter.restore())
  .pipe( $.uglify())
  .pipe( gulp.dest( config.buildFolder ));
});

gulp.task( 'dev', function ( done ) {
  return runSequence( 'clean', 'unbundle', 'vet', 'styles-debug', 'html',
    'enable-ng-debug-modes', done );
});

gulp.task( 'debug-build', function ( done ) {
  return runSequence( 'clean', 'vet', 'styles-debug', 'enable-ng-debug-modes',
    'bundle-debug', 'html', done );
});

gulp.task( 'rev', function () {
  var filesToRevision = [
    config.public + config.jsBuildMainFile,
    config.public + config.jsBuildLibFile,
    config.public + 'bootstrap.js'
  ];
  var filesToRevisionFilter = $.filter([
    config.jsBuildMainFile,
    config.jsBuildLibFile,
    'bootstrap.js'
  ]);
  var filesToReplaceWithin = [
    config.public + config.htmlBuildFile,
    config.public + 'bootstrap.js'
  ];
  //var filesToReplaceWithinFilter = [
  //  config.htmlBuildFile,
  //  'bootstrap.js'
  //];
  //var manifestFilter = $.filter([
  //  'rev-manifest.json'
  //]);

  return gulp.src( filesToRevision.concat( filesToReplaceWithin ))
  .pipe( filesToRevisionFilter )
  .pipe( $.rev())
  .pipe( gulp.dest( config.public ))
  .pipe( filesToRevisionFilter.restore())

  // using rev-replace in unfiltered mode, substitutes in the new file names
  // in *every* file of the stream. so from here on, only write out rev-replaced
  // files when a filesToReplaceWithin-filter is applied!
  // this should be the last step in the pipeline!
  .pipe( $.revReplace())

  //.pipe( $.rev.manifest())
  //.pipe( manifestFilter )
  //.pipe( gulp.dest( config.public ))
  //.pipe( manifestFilter.restore())

  //.pipe( $.filter( filesToReplaceWithinFilter ))
  // TODO: why is gulp-rev-replace not working inside another filter ??
    //.pipe( $.revReplace())
  .pipe( gulp.dest( config.public ));
  //.pipe( filesToReplaceWithinFilter.restore());
});

gulp.task( 'rev-and-clean', [ 'rev' ], function ( done ) {
  var filesToRevision = [
    config.public + config.jsBuildMainFile,
    config.public + config.jsBuildLibFile,
    config.public + 'bootstrap.js'
  ];

  clean( filesToRevision, done );
});

gulp.task( 'enable-ng-debug-modes', function () {
  return gulp.src( config.jsConstantsNgConfig )
  .pipe( $.replace( /\/\* nn-is-development \*\/ true/,
    'true', { skipBinary: true }))
  .pipe( $.rename( config.jsBuildConstantsNgConfig ))
  .pipe( gulp.dest( './' ));
});

gulp.task( 'disable-ng-debug-modes', function () {
  return gulp.src( config.jsConstantsNgConfig )
  .pipe( $.replace( /\/\* nn-is-development \*\/ true/,
    'false', { skipBinary: true }))
  .pipe( $.rename( config.jsBuildConstantsNgConfig ))
  .pipe( gulp.dest( './' ));
});

gulp.task( 'build', function ( done ) {
  return runSequence( 'clean', 'vet', 'styles', 'disable-ng-debug-modes',
    'bundle', 'minify', 'html', done );
});

gulp.task( 'production-build', function ( done ) {
  return runSequence( 'build', 'publish', done );
});

gulp.task( 'clean-html', function ( done ) {
  log( 'Cleaning html build files' );

  clean( config.frontend + config.htmlBuildFile, done );
});

gulp.task( 'html-sfx', [ 'clean-html' ], function () {
  log( 'Building html self extracting files' );

  var jsToIncludeInSfxBundle = gulp
    .src( config.jsToIncludeInHtmlSfx, { read: false });

  return gulp
    .src( config.html )
    .pipe( $.inject( jsToIncludeInSfxBundle, config.injectOptions ))
    .pipe( $.replace( '<script', '<script inline', { skipBinary: true }))
    .pipe( $.inlineSource( config.inlineSourceOptions ))
    .pipe( $.replace( '//# sourceMappingURL=traceur-runtime.js.map', '',
      { skipBinary: true }))
    .pipe( $.rename( config.htmlBuildFile ))
    .pipe( gulp.dest( config.buildFolder ));
});

gulp.task( 'html', [ 'clean-html' ], function () {
  log( 'Building html files' );

  var jsToIncludeInDefaultBundle = gulp
    .src( config.jsToIncludeInDefaultBundle, { read: false });

  return gulp
    .src( config.html )
    .pipe( $.inject( jsToIncludeInDefaultBundle, config.injectOptions ))
    .pipe( $.rename( config.htmlBuildFile ))
    .pipe( gulp.dest( config.frontend ));
});

gulp.task( 'bundle-sfx', [ 'unbundle' ], $.shell.task(
  [ 'jspm bundle-sfx main ' + config.jsBuildMainFile +
    ' --skip-source-maps' ],
  { cwd : config.absolutePathToFrontend }
));

//gulp.task( 'bundle-sfx', [ 'unbundle' ], function ( done ) {
//  runSequence( 'set-debug-modes',
//    $.shell.task(
//      [ 'jspm bundle-sfx main ' + config.jsBuildMainFile +
//        ' --skip-source-maps' ],
//      { cwd : config.absolutePathToFrontend }
//    ),
//    done
//  );
//});

gulp.task( 'build-standalone-html', [ 'clean' ], function ( done ) {
  log ( 'Building a stand-alone html file' );
  log ( '*** Warning: still experimental! ***' );

  return runSequence(
    'clean',
    'styles',
    'disable-ng-debug-modes',
    'bundle-sfx',
    'minify',
    'html-sfx',
    done
  );
});

  /*
   * Publish tasks
   */

gulp.task( 'clean-public', function ( done ) {
  log( 'Cleaning public folder' );

  clean( config.public + '**', done );
});

gulp.task( 'publish-source', function () {
  log( 'Copying source files to public folder' );

  return gulp.src( config.sourceFilesToPublish )
  .pipe( gulp.dest( config.public ));
});

gulp.task( 'publish-assets', function () {
  log( 'Copying asset files to public folder' );

  return gulp.src( config.assetFilesToPublish )
  .pipe( gulp.dest( config.publicAssets ));
});

gulp.task( 'publish', function ( done ) {
  return runSequence( 'clean-public', 'publish-source', 'publish-assets',
    'rev-and-clean', done );
});

  /*
   * Misc
   */

gulp.task( 'clean',
  [ 'clean-js', 'clean-styles', 'clean-html', 'clean-public' ]
);

gulp.task( 'default', [ 'help' ], function () {
});

gulp.task( 'help', $.taskListing );

gulp.task( 'hook', function () {
  log( 'Creating git pre-commit hook in .git/hooks folder' );

  return gulp.src( 'utilities/hooks/pre-commit' )
    .pipe( $.symlink( '.git/hooks/pre-commit' ));
});

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task( 'bump', function () {
  var msg = 'Bumping versions';
  var type = args.type;
  var version = args.ver;
  var options = {};

  if ( version ) {
    options.version = version;
    msg += ' to ' + version;
  } else {
    options.type = type;
    msg += ' for a ' + type;
  }
  log( msg );

  return gulp
    .src( config.packages )
    .pipe( $.print() )
    .pipe( $.bump( options ) )
    .pipe( gulp.dest( config.root ) );
});

  /*
   * Testing
   */

gulp.task( 'test', [ 'vet' ], function ( done ) {
  log( 'Running tests' );

  startTests( true, done );
});

gulp.task( 'autotest', [ 'vet' ], function ( done ) {
  log( 'Running tests continuously' );

  startTests( false, done );
});

gulp.task( 'test-server', function () {
  log( 'Running tests for backend' );
  log( '*** Warning. Still experimental ***' );

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
    [ 'back/app/**/*.js' ],
    [ 'test-server' ]);
});

  /*
   * Serving
   */

gulp.task( 'serve-dev', [ 'dev' ], function () {
  log( 'Serving dev' );

  serve( config.nodeEnvironments.development, getBrowserSyncWatchesDev() );
});

gulp.task( 'serve-debug-build', [ 'debug-build' ], function () {
  log( 'Serving debug-build' );

  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'debug-build' )
  );
});

gulp.task( 'serve-build', [ 'build' ], function () {
  log( 'Serving build' );

  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'build' )
  );
});

gulp.task( 'serve-production-build', [ 'production-build' ], function () {
  log( 'Serving production build' );

  serve(
    config.nodeEnvironments.production,
    getBrowserSyncWatchesBuild( 'production-build' )
  );
});

////////////////

function startTests ( singleRun, done ) {
  var karma = require( 'karma' ).server;
  var excludeFiles = [];
  //var serverTests = config.serverIntegrationTests; //TODO

  //excludeFiles = serverTests;

  karma.start({
    configFile : __dirname + config.karmaConfig,
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
        return runSequence(
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
//function errorLogger ( error ) {
//  log( '*** Start of Error ***' );
//  log( error );
//  log( '*** End of Error ***' );
//  this.emit( 'end' );
//}

function clean ( path, done ) {
  log( 'Cleaning: ' + $.util.colors.blue( path ));
  del ( path, done );
}

function changeEvent ( event ) {
  var srcPattern = new RegExp( '/.*(?=/' + config.frontend + ')/' );
  log( 'File ' + event.path.replace( srcPattern, '' ) + ' ' + event.type );
}

function log ( msg ) {
  if ( typeof msg === 'object' ) {
    for ( var item in msg ) {
      if ( msg.hasOwnProperty( item )) {
        $.util.log( $.util.colors.blue( msg[ item ] ));
      }
    }
  } else {
    $.util.log( $.util.colors.blue( msg ));
  }
}
