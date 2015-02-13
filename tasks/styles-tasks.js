var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var clean            = require( './nn-gulp-utils' ).clean;

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
  // potentially not needed anymore as systemjs-builder compresses css
  // .pipe( $.csso())
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
