// jscs:disable disallowAnonymousFunctions
/* jshint node: true */

var path             = require( 'path' );
var pathToMainFolder = ( path.join( process.cwd(), 'front/main' ));
var gulp             = require( 'gulp' );
var nodemon          = require( 'gulp-nodemon' );
var browserSync      = require( 'browser-sync' );
var reload           = browserSync.reload;
var runSequence      = require( 'run-sequence' );
var del              = require( 'del' );
var shell            = require( 'gulp-shell' );
var jscs             = require( 'gulp-jscs' );
var jshint           = require( 'gulp-jshint' );
var symlink          = require( 'gulp-symlink' );
//var sass             = require( 'gulp-sass' );
var mocha            = require( 'gulp-mocha' );
var gutil            = require( 'gulp-util' );
var uglify           = require( 'gulp-uglify' );
var ngAnnotate       = require( 'gulp-ng-annotate' );
var jsdoc            = require( 'gulp-jsdoc' );

gulp.task( 'clean', [ 'clean-build-artifacts', 'clean-public' ], function () {
});

gulp.task( 'clean-build-artifacts', function ( cb ) {
  del([
    'front/main/build.*',
    // becomes functional as soon as we make use of sass
    //,
    //'front/main/index.css'
  ], cb );
});

gulp.task( 'clean-public', function ( cb ) {
  del([ 'public/**' ], cb );
});

gulp.task( 'set-remote-mode', shell.task(
  [ 'jspm setmode remote' ], { cwd : pathToMainFolder }
) );

gulp.task( 'set-local-mode', shell.task(
  [ 'jspm setmode local' ], { cwd : pathToMainFolder }
) );

gulp.task( 'build-production', [ 'set-local-mode' ], function () {
  buildProduction();
});

gulp.task( 'bundle-production',
  //[ 'lint', 'jscs' ],
  shell.task(
    [ 'jspm bundle main + css + text build.js --inject --skip-source-maps' ],
    { cwd : pathToMainFolder }
  )
);

function buildProduction ( next ) {
  runSequence(
    'clean',
    function () {
      runSequence(
        'bundle-production',
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

gulp.task( 'build-debug', [ 'set-local-mode' ], function () {
  buildDebug();
});

gulp.task( 'bundle-debug',
  //[ 'lint', 'jscs' ],
  shell.task([ 'jspm bundle main + css + text  build.js --inject ' ],
    { cwd : pathToMainFolder }
  )
);

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
    }
  );
}

gulp.task( 'unbundle', shell.task(
  [ 'jspm unbundle' ],
  { cwd : pathToMainFolder }
) );

gulp.task( 'build-sass', function () {
  //return gulp.src( 'front/main/lib/index.scss' )
  //  .pipe( sass({ style : 'compressed' }) )
  //  .pipe( gulp.dest( 'front/main' ) );
});

gulp.task( 'publish', [ 'clean-public' ], function () {
  gulp.src([
    'front/main/favicon.ico',
    'front/main/*.js',
    'front/main/*.js.map',
    'front/main/index.*'
  ]).pipe( gulp.dest( 'public' ) );

  gulp.src([
    'front/main/lib/assets/**/*'
  ]).pipe( gulp.dest( 'public/lib/assets' ) );
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
    gulp.watch(
      [
        'front/main/**/*',
        'front/main/lib/**/*.scss',
        '!front/main/**/*_scsslint_*',
        '!front/main/**/*.css.map',
        '!front/main/dist/**/*',
        '!front/main/jspm_packages/**',
        '!front/main/build.*',
        '!front/main/index.css',
        '!front/main/config.js',
        '!front/main/package.json',
        '!front/main/**/*.spec.js'
      ],
      [ action ]
    );
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
  return nodemon( options )
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
  buildProduction( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'watch-production', function () {
  process.env.NODE_ENV = 'production';
  buildProduction( function () {
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

gulp.task( 'jscs', function () {
  return gulp.src([
    'gulpfile.js',
    'front/main/**/*.js',
    '!front/main/jspm_packages/**/*',
    '!front/main/dist/**/*',
    '!front/main/build.js',
    '!front/main/config.js'
  ])
    .pipe( jscs() );
});

gulp.task( 'lint', function () {
  gulp.src([
    'gulpfile.js',
    'front/main/**/*.js',
    '!front/main/jspm_packages/**/*',
    '!front/main/dist/**/*',
    '!front/main/build.js',
    '!front/main/config.js',
    '!front/main/es6-module-loader*.js',
    '!front/main/system*.js',
    '!front/main/traceur*.js',
    '!front/main/traceur-runtime*.js',
    '!front/main/lib/user/**/*'
  ])
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( 'jshint-stylish' ) )
    .pipe( jshint.reporter( 'fail' ) );
});

gulp.task( 'hook', function () {
  return gulp.src( 'utilities/hooks/pre-commit' )
    .pipe( symlink( '.git/hooks' ) );
});

gulp.task( 'test-server', function () {
  return gulp.src( 'back/app/**/*.spec.js', { read : false })
    .pipe( mocha({
      reporter : 'spec',
      globals  : {
        should : require( 'should' )
      }
    }) )
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
  .pipe( ngAnnotate({
    remove        : false,
    add           : true,
    single_quotes : true // jscs:disable
  }) )
  .pipe( uglify() )
  .pipe( gulp.dest( 'front/main' ) );
});

gulp.task( 'default', function () {
  gulp.start( 'watch' );
});
