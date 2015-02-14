var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var runSequence      = require( 'run-sequence' );
var log              = require( './nn-gulp-utils' ).log;
var clean            = require( './nn-gulp-utils' ).clean;

gulp.task( 'clean-js', function ( done ) {
  log( 'Cleaning javascript build files' );

  clean( config.jsBuildFiles, done );
});

gulp.task( 'unbundle', $.shell.task(
  [ 'jspm unbundle' ],
  { cwd : config.absolutePathToFrontend }
));

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

gulp.task( 'bundle-sfx', [ 'unbundle' ], $.shell.task(
  [ 'jspm bundle-sfx main ' + config.jsBuildMainFile +
    ' --skip-source-maps' ],
  { cwd : config.absolutePathToFrontend }
));

// TODO: check out how to use shell.task in different ways
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

gulp.task( 'enable-ng-debug-modes', function () {
  return setNgDebugModes( true );
});

gulp.task( 'disable-ng-debug-modes', function () {
  return setNgDebugModes( false );
});

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

gulp.task( 'build-dev', function ( done ) {
  log( 'Building for development' );

  runSequence(
    'clean',
    'unbundle',
    'vet',
    'styles-debug',
    'enable-ng-debug-modes',
    'html',
    done
  );
});

gulp.task( 'build-debug', function ( done ) {
  log( 'Building with debugging enabled' );

  runSequence(
    'clean',
    'vet',
    'styles-debug',
    'enable-ng-debug-modes',
    'bundle-debug',
    'html',
    done
  );
});

gulp.task( 'build', function ( done ) {
  log( 'Building with optimizations enabled' );

  runSequence(
    'clean',
    'vet',
    'styles',
    'disable-ng-debug-modes',
    'bundle',
    'minify',
    'html',
    done
  );
});

gulp.task( 'build-standalone-html', [ 'clean' ], function ( done ) {
  log ( 'Building a stand-alone html file' );
  log ( '*** Warning: still experimental! ***' );

  runSequence(
    'clean',
    'vet',
    'styles',
    'disable-ng-debug-modes',
    'bundle-sfx',
    'minify',
    'html-standalone',
    done
  );
});

gulp.task( 'build-production', function ( done ) {
  log( 'Building for production' );

  runSequence(
    'build',
    'publish',
    done
  );
});

gulp.task( 'build-gh-pages', function ( done ) {
  log( 'Building for GitHub Pages deployment' );

  runSequence(
    'build',
    'publish-gh-pages',
    // no longer needed. changed to a custom domain
    //'set-gh-pages-base-href',
    done
  );
});

///////////////////////////

function setNgDebugModes ( isDebug ) {
  return gulp.src( config.jsConstantsNgConfig )
  .pipe( $.replace( /\/\* nn-is-development \*\/ true/,
    isDebug.toString(), { skipBinary: true }))
  .pipe( $.rename( config.jsBuildConstantsNgConfig ))
  .pipe( gulp.dest( './' ));
}
