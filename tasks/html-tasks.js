var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var clean            = require( './nn-gulp-utils' ).clean;

gulp.task( 'clean-html', function ( done ) {
  log( 'Cleaning html build files' );

  clean( config.frontend + config.htmlBuildFile, done );
});

gulp.task( 'set-gh-pages-base-href', function () {
  return gulp
    .src( config.public + config.htmlBuildFile )
    .pipe( $.replace( '<base href="/">', '<base href="/ng-next-example/">',
      { skipBinary: true }))
    .pipe( gulp.dest( config.public ));
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

gulp.task( 'html-standalone', [ 'clean-html' ], function () {
  log( 'Building stand-alone html file' );

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
