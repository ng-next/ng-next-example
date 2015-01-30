// jscs:disable disallowAnonymousFunctions
/* jshint node: true */

var gulp             = require( 'gulp' );
var args             = require( 'yargs' ).argv;
var config           = require( './gulp.config' )();
var path             = require( 'path' );
var pathToMainFolder = ( path.join( process.cwd(), 'front/main' ));
var $                = require( 'gulp-load-plugins' )({ lazy : true});

var runSequence      = require( 'run-sequence' );
var del              = require( 'del' );
var browserSync      = require( 'browser-sync' );
var reload           = browserSync.reload;

gulp.task( 'clean', [ 'clean-build-artifacts', 'clean-public' ], function () {
});

gulp.task( 'clean-build-artifacts', function ( cb ) {
  del( config.buildArtifacts, cb );
});

gulp.task( 'clean-public', function ( cb ) {
  del( config.publicFolderAndSubfolders, cb );
});

gulp.task( 'set-remote-mode', $.shell.task(
  [ 'jspm setmode remote' ], { cwd : pathToMainFolder }
));

gulp.task( 'set-local-mode', $.shell.task(
  [ 'jspm setmode local' ], { cwd : pathToMainFolder }
));

gulp.task( 'build', [ 'set-local-mode', 'vet' ], function () {
  build();
});

gulp.task( 'bundle', $.shell.task(
  [ 'jspm bundle main + css + text build.js --inject --skip-source-maps' ],
  { cwd : pathToMainFolder }
));

function build ( next ) {
  runSequence(
    'clean',
    function () {
      runSequence(
        'bundle',
        'minify',
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass',
        function () {
          //runSequence( 'set-remote-mode', function () {
          //  if ( next ) {
          //    runSequence( 'publish', next );
          //  } else {
          //    runSequence( 'publish' );
          //  }
          if ( next ) {
            next();
          }
          //});
        });
    }
  );
}

gulp.task( 'build-debug', [ 'set-local-mode', 'vet' ], function () {
  buildDebug();
});

gulp.task( 'bundle-debug', $.shell.task(
  [ 'jspm bundle main + css + text  build.js --inject ' ],
  { cwd : pathToMainFolder }
));

function buildDebug ( next ) {
  runSequence( 'clean', function () {
    runSequence(
      'bundle-debug',
      // becomes functional as soon as we make use of sass
      //,
      //'build-sass',
      function () {
        if ( next ) {
          next();
        }
      }
    );
  });
}

gulp.task( 'unbundle', $.shell.task(
  [ 'jspm unbundle' ],
  { cwd : pathToMainFolder }
));

gulp.task( 'build-sass', function () {
  //return gulp.src( 'front/main/lib/index.scss' )
  //  .pipe( sass({ style : 'compressed' }))
  //  .pipe( gulp.dest( 'front/main' ));
});

gulp.task( 'publish', [ 'clean-public' ], function () {
  gulp.src( config.sourceFilesToPublish )
  .pipe( gulp.dest( config.publicFolder ));

  gulp.src( config.assetFilesToPublish )
  .pipe( gulp.dest( config.publicAssetFolder ));
});

gulp.task( 'dev', function () {
  switchToDevelopmentMode();
});

function switchToDevelopmentMode ( next ) {
  runSequence( 'clean', function () {
    if ( next ) {
      runSequence(
        'unbundle',
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass',
        next
      );
    } else {
      runSequence(
        'unbundle'
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass'
      );
    }
  });
}

function runBrowsersyncAndWatchFiles ( action ) {
  runSequence( 'browser-sync-front', function () {
    gulp.watch( config.frontendFilesToWatch, [ action ]);
  });
}

//gulp.task( 'watch-sass', function () {
//  gulp.watch(
//    [
//      'front/main/lib/**/*.scss'
//    ],
//    [ 'build-sass' ]
//  );
//});

gulp.task( 'browser-sync-front', function () {
  browserSync({
    proxy   : 'localhost:3000',  // local node app address
    port    : 5000,
    //host    : 'local-62e12256-8891-442a-885c-c2a1fa812a43.dev',
    open    : 'external',
    notify  : true,
    browser : 'google chrome'
  });
});

gulp.task( 'browser-sync-front-back', [ 'nodemon' ], function () {
  browserSync({
    proxy   : 'localhost:3000',  // local node app address
    port    : 5000,
    //host    : 'local-62e12256-8891-442a-885c-c2a1fa812a43.dev',
    open    : 'external',
    notify  : true,
    browser : 'google chrome'
  });
});

gulp.task( 'reload-browsers', function () {
  // browserSync.reload();
  setTimeout( function () {
    browserSync.reload({ stream : false });
  }, 250 );
});

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

gulp.task( 'bundle-debug-and-reload', function () {
  buildDebug( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'production-and-reload', function () {
  build( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'watch-production', function () {
  process.env.NODE_ENV = 'production';
  build( function () {
    runBrowsersyncAndWatchFiles( 'production-and-reload' );
  });
});

gulp.task( 'watch-build-debug', function () {
  process.env.NODE_ENV = 'bundle-debug';
  buildDebug( function () {
    runBrowsersyncAndWatchFiles( 'bundle-debug-and-reload' );
  });
});

gulp.task( 'watch', function () {
  process.env.NODE_ENV = 'development';
  switchToDevelopmentMode( function () {
    runBrowsersyncAndWatchFiles( 'reload-browsers' );
  });
});

gulp.task( 'vet', function () {
  log( 'Analyzing source with JSHint and JSCS' );

  return gulp.src( config.alljs )
  .pipe( $.if( args.verbose, $.print()))
  .pipe( $.jscs())
  .pipe( $.jshint( '.jshintrc' ))
  .pipe( $.jshint.reporter( 'jshint-stylish', { verbose: true }))
  .pipe( $.jshint.reporter( 'fail' ));
});

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
    .on( 'error', gutil.log );
});

gulp.task( 'watch-test-server', function () {
  return gulp.watch(
    [ 'back/app/**/*.js' ],
    [ 'test-server' ]);
});

gulp.task( 'minify', function () {
  return gulp.src([
    'front/main/build.js'
  ])
  .pipe( $.ngAnnotate({
    remove        : false,
    add           : true,
    single_quotes : true // jscs:disable
  }))
  .pipe( $.uglify())
  .pipe( gulp.dest( 'front/main' ));
});

gulp.task( 'default', function () {
  gulp.start( 'watch' );
});

////////////////

function log ( msg ) {
  if ( typeof msg === 'object' ) {
    for ( var item in msg ) {
      if ( msg.hasOwnProperty( item )) {
        $.util.log( $.util.colors.blue( msg[ item ]));
      }
    }
  } else {
    $.util.log( $.util.colors.blue( msg ));
  }
}
