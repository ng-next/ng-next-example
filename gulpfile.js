/* jshint node: true */

var gulp             = require( 'gulp' );
var args             = require( 'yargs' ).argv;
var config           = require( './gulp.config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var del              = require( 'del' );
var runSequence      = require( 'run-sequence' );
var browserSync      = require( 'browser-sync' );
//var reload           = browserSync.reload;
var port             = process.env.PORT || config.nodeServerDefaultPort;

  /*
   * Code Style, Code Quality
   */

gulp.task( 'vet', function () {
  log( 'Analyzing source with JSHint and JSCS' );

  return gulp.src( config.alljs )
  .pipe( $.if( args.verbose, $.print()))
  .pipe( $.jscs())
  .pipe( $.jshint( '.jshintrc' ))
  .pipe( $.jshint.reporter( 'jshint-stylish', { verbose: true }))
  .pipe( $.jshint.reporter( 'fail' ));
});

  /*
   * Styles
   */

gulp.task( 'clean-styles', function ( done ) {
  var files = [
    config.stylesTargetFolder + '*.css',
    config.stylesTargetFolder + '*.css.map'
  ];
  clean( files, done );
});

gulp.task( 'styles', [ 'clean-styles' ], function () {
  log( 'Compiling sass --> css, Autoprefixing css' );

  return gulp.src( config.styles )
  .pipe( $.plumber())
  .pipe( $.sass( config.sassOptions ))
  .pipe( $.minifyCss({ keepBreaks : true }))
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( gulp.dest( config.stylesTargetFolder ));
});

gulp.task( 'styles-debug', [ 'clean-styles' ], function () {
  log( 'Compiling sass --> css (with sourcemaps), Autoprefixing css' );

  return gulp.src( config.styles )
  .pipe( $.plumber())
  .pipe( $.sourcemaps.init())
  .pipe( $.sass( config.sassOptions ))
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( $.sourcemaps.write( './' ))
  .pipe( gulp.dest( config.stylesTargetFolder ));
});

//gulp.task( 'sass-watcher', function () {
//  gulp.watch( config.styles, [ 'styles' ]);
//});

  /*
   * Build / Bundle js, html
   */

gulp.task( 'clean-js', function ( done ) {
  clean( config.jsBuildFiles, done );
});

gulp.task( 'bundle', [ 'unbundle' ], $.shell.task(
  [ 'jspm bundle main + css + text ' + config.jsBuildFile +
    ' --inject --skip-source-maps' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'bundle-debug', [ 'unbundle' ], $.shell.task(
  [ 'jspm bundle main + css + text ' + config.jsBuildFile + ' --inject' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'unbundle', [ 'clean-js' ], $.shell.task(
  [ 'jspm unbundle' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'minify', function () {
  return gulp.src([
    config.frontend + config.jsBuildFile
  ])
  .pipe( $.ngAnnotate( config.ngAnnotateOptions ))
  .pipe( $.uglify())
  .pipe( gulp.dest( config.jsTargetFolder ));
});

gulp.task( 'dev', [ 'vet', 'unbundle',  'styles-debug', 'html' ]);

gulp.task( 'debug-build', [ 'vet', 'bundle-debug', 'styles-debug', 'html' ]);

gulp.task( 'build', [ 'vet', 'styles', 'html' ], function ( done ) {
  return runSequence( 'bundle', 'minify', function () {
    done();
  });
});

gulp.task( 'production-build', function ( done ) {
  return runSequence( 'build', 'publish', function () {
    done();
  });
});

gulp.task( 'clean-html', function ( done ) {
  clean( config.frontend + config.htmlBuildFile, done );
});

gulp.task( 'html-sfx', [ 'clean-html' ], function () {
  var stylesToIncludeInSfxBundle = gulp
    .src( config.stylesToIncludeInSfxBundle, { read: false });

  var jsToIncludeInSfxBundle = gulp
    .src( config.jsToIncludeInSfxBundle, { read: false });

  return gulp
    .src( config.html )
    .pipe( $.inject( stylesToIncludeInSfxBundle, config.injectOptions ))
    .pipe( $.inject( jsToIncludeInSfxBundle, config.injectOptions ))
    .pipe( $.replace( '<link', '<link inline', { skipBinary: true }))
    .pipe( $.replace( '<script', '<script inline', { skipBinary: true }))
    .pipe( $.inlineSource( config.inlineSourceOptions ))
    .pipe( $.replace( '//# sourceMappingURL=traceur-runtime.js.map', '',
      { skipBinary: true }))
    .pipe( $.rename( config.htmlBuildFile ))
    .pipe( gulp.dest( config.frontend ));
});

gulp.task( 'html', [ 'clean-html' ], function () {
  var jsToIncludeInDefaultBundle = gulp
    .src( config.jsToIncludeInDefaultBundle, { read: false });

  return gulp
    .src( config.html )
    .pipe( $.inject( jsToIncludeInDefaultBundle, config.injectOptions ))
    .pipe( $.rename( config.htmlBuildFile ))
    .pipe( gulp.dest( config.frontend ));
});

gulp.task( 'bundle-sfx', [ 'unbundle' ], $.shell.task(
  [ 'jspm bundle-sfx main ' + config.jsBuildFile +
    ' --inject --skip-source-maps' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'install-angular-material-css-dep-free', $.shell.task(
  [ 'jspm install angular-material' +
  ' -o ./../jspm-overrides/override-angular-material-css-dep-free.json' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'install-angular-material', $.shell.task(
  [ 'jspm install angular-material' ],
  { cwd : config.absolutePathToFrontend }
));

gulp.task( 'build-standalone-html', function ( done ) {
  log ( 'Building a stand-alone html file' );
  log ( '*** Warning: still experimental! ***' );

  return runSequence(
    'install-angular-material-css-dep-free',
    'styles',
    'bundle-sfx',
    'minify',
    'html-sfx',
    'install-angular-material',
    function () {
      done();
    }
  );
});

  /*
   * Publish tasks
   */

gulp.task( 'clean-public', function ( done ) {
  clean( config.publicFolder + '**', done );
});

gulp.task( 'publish-source', function () {
  return gulp.src( config.sourceFilesToPublish )
  .pipe( gulp.dest( config.publicFolder ));
});

gulp.task( 'publish-assests', function () {
  return gulp.src( config.assetFilesToPublish )
  .pipe( gulp.dest( config.publicAssetFolder ));
});

gulp.task( 'publish', function ( done ) {
  return runSequence( 'clean-public', 'publish-source', 'publish-assests',
    function () {
      done();
    });
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
  return gulp.src( 'utilities/hooks/pre-commit' )
    .pipe( $.symlink( '.git/hooks/pre-commit' ));
});

  /*
   * Testing
   */

gulp.task( 'test-server', function () {
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
  return gulp.watch(
    [ 'back/app/**/*.js' ],
    [ 'test-server' ]);
});

  /*
   * Serving
   */

gulp.task( 'serve-dev', [ 'dev' ], function () {
  serve( config.nodeEnvironments.development, getBrowserSyncWatchesDev() );
});

gulp.task( 'serve-debug-build', [ 'debug-build' ], function () {
  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'debug-build' )
  );
});

gulp.task( 'serve-build', [ 'build' ], function () {
  serve(
    config.nodeEnvironments.development,
    getBrowserSyncWatchesBuild( 'build' )
  );
});

gulp.task( 'serve-production-build', [ 'production-build' ], function () {
  serve(
    config.nodeEnvironments.production,
    getBrowserSyncWatchesBuild( 'production-build' )
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
  if ( browserSync.active ) {
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
    logPrefix      : 'gulp-patterns',
    notify         : true,
    reloadDelay    : 1000
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
