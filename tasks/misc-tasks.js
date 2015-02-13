var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var args             = require( 'yargs' ).argv;

gulp.task( 'clean',
  [ 'clean-js', 'clean-styles', 'clean-html', 'clean-public' ]
);

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
    .pipe( $.print())
    .pipe( $.bump( options ))
    .pipe( gulp.dest( config.root ));
});

gulp.task( 'default', [ 'help' ], function () {
});

gulp.task( 'help', $.taskListing );

gulp.task( 'hook', function () {
  log( 'Creating git pre-commit hook in .git/hooks folder' );

  return gulp.src( 'utilities/hooks/pre-commit' )
    .pipe( $.symlink( '.git/hooks/pre-commit' ));
});
