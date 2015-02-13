var gulp             = require( 'gulp' );
var config           = require( './gulp-config' )();
var $                = require( 'gulp-load-plugins' )({ lazy : true });
var log              = require( './nn-gulp-utils' ).log;
var clean            = require( './nn-gulp-utils' ).clean;
var runSequence      = require( 'run-sequence' );

gulp.task( 'clean-public', function ( done ) {
  log( 'Cleaning public folder' );

  clean( config.public + '**', done );
});

gulp.task( 'publish-source', function () {
  log( 'Copying source files to public folder' );

  return gulp
    .src( config.sourceFilesToPublish )
    .pipe( gulp.dest( config.public ));
});

gulp.task( 'publish-assets', function () {
  log( 'Copying asset files to public folder' );

  return gulp
    .src( config.assetFilesToPublish )
    .pipe( gulp.dest( config.publicAssets ));
});

gulp.task( 'publish-lib', function () {
  log( 'Copying 3rdParty loader library files to public folder' );

  return gulp
    .src( config.frontendLib + '*.*' )
    .pipe( gulp.dest( config.publicLib ));
});

gulp.task( 'build-revisioned-files', function () {
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

gulp.task( 'clean-files-to-revision', function ( done ) {
  var filesToRevision = [
    config.public + config.jsBuildMainFile,
    config.public + config.jsBuildLibFile,
    config.public + 'bootstrap.js'
  ];

  clean( filesToRevision, done );
});

gulp.task( 'rev', function ( done ) {
  runSequence(
    'build-revisioned-files',
    'clean-files-to-revision',
    done
  );
});

gulp.task( 'publish', function ( done ) {
  runSequence(
    'clean-public',
    'publish-source',
    'publish-assets',
    'rev',
    done
  );
});
