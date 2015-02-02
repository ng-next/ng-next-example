/* jshint node: true */

var gulp             = require( 'gulp' );
var args             = require( 'yargs' ).argv;
var config           = require( './gulp.config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var del              = require( 'del' );
var runSequence      = require( 'run-sequence' );
var browserSync      = require( 'browser-sync' );
var reload           = browserSync.reload;

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

  return gulp.src( config.sass )
  .pipe( $.plumber())
  .pipe( $.sass( config.sassOptions ))
  .pipe( $.minifyCss({ keepBreaks : true }))
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( gulp.dest( config.stylesTargetFolder ));
});

gulp.task( 'styles-debug', [ 'clean-styles' ], function () {
  log( 'Compiling sass --> css (with sourcemaps), Autoprefixing css' );

  return gulp.src( config.sass )
  .pipe( $.plumber())
  .pipe( $.sourcemaps.init())
  .pipe( $.sass( config.sassOptions ))
  .pipe( $.autoprefixer( config.autoprefixerOptions ))
  .pipe( $.sourcemaps.write( './' ))
  .pipe( gulp.dest( config.stylesTargetFolder ));
});

gulp.task( 'sass-watcher', function () {
  gulp.watch( config.sass, [ 'styles' ]);
});

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

function build ( next ) {
  return runSequence(
    'styles',
    'bundle',
    'minify',
    'html',
    function () {
      if ( next ) {
        next();
      }
    }
  );
}

gulp.task( 'build', [ 'vet' ], function ( done ) {
  build( done );
});

function buildDebug ( next ) {
  return runSequence(
    'styles-debug',
    'bundle-debug',
    'html',
    function () {
      if ( next ) {
        next();
      }
    }
  );
}

gulp.task( 'build-debug', [ 'vet' ], function ( done ) {
  buildDebug( done );
});

function buildDev ( next ) {
  return runSequence(
    'clean-styles',
    'clean-html',
    'styles-debug',
    'html',
    function () {
      if ( next ) {
        next();
      }
    }
  );
}

gulp.task( 'build-dev', [ 'unbundle', 'vet' ], function ( done ) {
  buildDev( done );
});

gulp.task( 'clean-html', function ( done ) {
  var files = [
    config.frontend + config.htmlBuildFile
  ];
  clean( files, done );
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

gulp.task( 'build-standalone-html', function () {
  log ( 'Building a stand-alone html file' );
  log ( '*** Warning: still experimental! ***' );

  return runSequence(
    'install-angular-material-css-dep-free',
    'styles',
    'bundle-sfx',
    'minify',
    'html-sfx',
    'install-angular-material'
  );
});

  /*
   *  Live Reload / Browser Sync
   */

function runBrowsersyncAndWatchFiles ( action ) {
  runSequence( 'browser-sync-front', function () {
    gulp.watch( config.frontendFilesToWatch, [ action ]);
  });
}

gulp.task( 'browser-sync-front', function () {
  browserSync({
    proxy   : 'localhost:3000',  // local node app address
    port    : 5000,
    //host    : 'local.dev',
    open    : 'external',
    notify  : true,
    browser : 'google chrome'
  });
});

gulp.task( 'browser-sync-front-back', [ 'nodemon' ], function () {
  browserSync({
    proxy   : 'localhost:3000',  // local node app address
    port    : 5000,
    //host    : 'local.dev',
    open    : 'external',
    notify  : true,
    browser : 'google chrome'
  });
});

gulp.task( 'reload-browsers', function () {
  setTimeout( function () {
    browserSync.reload({ stream : false });
  }, 250 );
});

  /*
   *  Watch, Build, Reload Browser
   */

gulp.task( 'nodemon', function ( cb ) {
  var called;
  var options;

  options = {
    script : './back/app.js',
    //  , env: {
    //      'NODE_ENV': 'development'
    //    }
    watch  : [ 'back' ],
    ext    : 'js',
    // , ignore: ['front', 'public', '.idea', '*.spec.js']
    ignore : [ 'node_modules/**/*', '*.spec.js' ]
    // , nodeArgs: ['--debug-brk']
  };

  called = false;
  return $.nodemon( options )
    .on( 'start', function () {
      if ( !called ) {
        called = true;
        cb();
      }
    })
    .on( 'restart', function () {
      setTimeout( function () {
        reload(  { stream : false });
      }, 1000 );
    });

  //  .on('change', ['lint'])
});

gulp.task( 'build-and-reload', function () {
  build( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'build-and-watch', function () {
  //process.env.NODE_ENV = 'production';
  process.env.NODE_ENV = 'development';
  build( function () {
    runBrowsersyncAndWatchFiles( 'build-and-reload' );
  });
});

gulp.task( 'build-debug-and-reload', function () {
  buildDebug( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'build-debug-and-watch', function () {
  process.env.NODE_ENV = 'build-debug';
  buildDebug( function () {
    runBrowsersyncAndWatchFiles( 'build-debug-and-reload' );
  });
});

gulp.task( 'build-dev-and-reload', function () {
  buildDev( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'watch', [ 'unbundle' ], function () {
  process.env.NODE_ENV = 'development';
  runBrowsersyncAndWatchFiles( 'build-dev-and-reload' );
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

gulp.task( 'publish', function () {
  return runSequence( 'clean-public', 'publish-source', 'publish-assests' );
});

  /*
   * Misc
   */

gulp.task( 'hook', function () {
  return gulp.src( 'utilities/hooks/pre-commit' )
    .pipe( $.symlink( '.git/hooks' ));
});

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

gulp.task( 'default', function () {
  gulp.start( 'watch' );
});

////////////////

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
