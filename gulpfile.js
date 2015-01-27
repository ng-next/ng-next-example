// jscs:disable disallowAnonymousFunctions
// baked in concept of gulp task to have an anonymous function per gulp-task

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
  //  console.log(path.join( process.cwd(), 'front/main' ) );
});

gulp.task( 'clean-build-artifacts', function ( cb ) {
  del([
    'front/main/build.*',
    'front/main/dist/**'
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

gulp.task( 'bundle-production',
  //[ 'lint' ],
  shell.task(
    [ 'jspm bundle main + css + text build.js --inject' ],
    { cwd : pathToMainFolder }
  )
);

gulp.task( 'bundle-dev', [ 'lint' ], shell.task(
  [ 'jspm bundle main + css + text  --inject ' ],
  { cwd : pathToMainFolder }
) );

gulp.task( 'bundle-dummy', [ 'lint' ], shell.task(
  [ 'jspm bundle text - text  --inject ' ],
  { cwd : pathToMainFolder }
) );

gulp.task( 'build-sass', function () {
  //return gulp.src( 'front/main/lib/index.scss' )
  //  .pipe( sass({ style : 'compressed' }) )
  //  .pipe( gulp.dest( 'front/main' ) );
});

gulp.task( 'publish', [ 'clean-public' ], function () {
  // TODO: remove. was used before making use of minification task
  //  gulp.src([
  //    'front/main/dist/**/*',
  //    '!front/main/dist/**/*.spec.*'
  //  ]).pipe( gulp.dest( 'public/dist' ) );

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

function runProductionSequence ( next ) {
  runSequence(
    'clean-build-artifacts',
    // TODO: move mode setting to individual tasks (if still needed)!
    'set-local-mode',
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
          //});
        });
    }
  );
}

function runBundledDevSequence ( next ) {
  runSequence(
    'clean-build-artifacts',
    // TODO: move mode setting to individual tasks (if still needed)!
    'set-local-mode',
    function () {
      runSequence(
        'bundle-dev',
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass',
        function () {
          if ( next ) {
            runSequence( 'publish', next );
          } else {
            runSequence( 'publish' );
          }
        });
    }
  );
}

function runDevSequence ( next ) {
  runSequence( 'clean', 'set-local-mode', function () {
    if ( next ) {
      runSequence(
        'bundle-dummy',
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass',
        next
      );
    } else {
      runSequence(
        'bundle-dummy'
        // becomes functional as soon as we make use of sass
        //,
        //'build-sass'
      );
    }
  });
}

function runBrowsersyncAndWatchFiles ( action ) {
  runSequence( 'browser-sync', function () {
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

gulp.task( 'production', function () {
  runProductionSequence();
});

gulp.task( 'bundled-dev', function () {
  runBundledDevSequence();
});

gulp.task( 'dev', function () {
  runDevSequence();
});

gulp.task( 'browser-sync', function () {
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

gulp.task( 'production-and-reload', function () {
  runProductionSequence( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'bundle-dev-and-reload', function () {
  runBundledDevSequence( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'dev-and-reload', function () {
  runDevSequence( function () {
    gulp.start( 'reload-browsers' );
  });
});

gulp.task( 'watch-production', function () {
  process.env.NODE_ENV = 'production';
  runProductionSequence( function () {
    runBrowsersyncAndWatchFiles( 'production-and-reload' );
  });
});

gulp.task( 'watch-bundled-dev', function () {
  process.env.NODE_ENV = 'bundled-dev';
  runBundledDevSequence( function () {
    runBrowsersyncAndWatchFiles( 'bundle-dev-and-reload' );
  });
});

gulp.task( 'watch-dev', function () {
  process.env.NODE_ENV = 'development';
  runDevSequence( function () {
    runBrowsersyncAndWatchFiles( 'dev-and-reload' );
  });
});

gulp.task( 'watch', function () {
  //gulp.start( 'watch-dev' );
  process.env.NODE_ENV = 'development';
  runBrowsersyncAndWatchFiles( 'reload-browsers' );
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

//TODO: check esprima harmony compatibility
gulp.task( 'minify', function () {
  return gulp.src([
    'front/main/build.js'
  ])
  .pipe( ngAnnotate({
    remove        : false,
    add           : true,
    single_quotes : true // jscs:disable
  }) )
  //.pipe( uglify() )
  .pipe( gulp.dest( 'front/main' ) );
});

gulp.task( 'default', function () {
  gulp.start( 'watch' );
});
