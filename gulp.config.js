/* global module */
/* jshint node:true */
// jscs disable:

var path = require( 'path' );

module.exports = function () {
  var frontend               = 'front/main/';
  var servedFolder           = 'public/';
  var jsTargetFolder         = frontend;
  var stylesTargetFolder     = frontend;
  var jsBuildFile            = 'build.js';
  var stylesBuildFile        = 'main.css';

  return {

    /*
     * Files Paths
     */

    absolutePathToFrontend     : ( path.join( process.cwd(), frontend )),

    frontend                   : frontend,

    // publically accessable folder that should be served by the webserver
    publicFolder               : servedFolder,

    publicAssetFolder          : servedFolder + 'lib/assets',

    // output folder of the css preprocessing
    stylesTargetFolder         : stylesTargetFolder,

    // output folder of the js concat and minification processing
    jsTargetFolder             : jsTargetFolder,

    /*
     * File Names
     */

    jsBuildFile                : jsBuildFile,

    stylesBuildFile            : stylesBuildFile,

    htmlBuildFile              : 'index.html',

    /*
     * Source Files
     */

    sass                       : [
      frontend + 'lib/config/styles/main.scss'
    ],

    html                       : frontend + 'main.html',

    jsBuildFiles               : [
      ( jsTargetFolder + jsBuildFile ),
      ( jsTargetFolder + jsBuildFile.replace( '.js', '.map.js' ))
    ],

    // all js files to vet
    alljs                      : [
      'gulpfile.js',
      'gulp.config.js',
      frontend + '**/*.js',
      '!' + frontend + 'jspm_packages/**/*',
      '!' + frontend + 'dist/**/*',
      '!' + frontend + 'build.js',
      '!' + frontend + 'config.js'
    ],

    stylesToIncludeInSfxBundle : [
      frontend + 'jspm_packages/github/angular/bower-material@0.7.1/angular-material.css', // jscs: disable
      stylesTargetFolder + stylesBuildFile
    ],

    jsToIncludeInSfxBundle     : [
      frontend + 'jspm_packages/traceur-runtime.js',
      frontend + jsBuildFile
    ],

    jsToIncludeInDefaultBundle : [
      frontend + 'jspm_packages/system.js',
      frontend + 'config.js',
      frontend + 'bootstrap.js'
    ],

    // all files that should be copied to the public folder and served by
    // the webserver
    sourceFilesToPublish       : [
      frontend + 'favicon.ico',
      frontend + '*.js',
      frontend + '*.js.map',
      frontend + '*.css',
      frontend + '*.css.map',
      frontend + 'index.html'
    ],

    // all assets that should be copied to the public asset folder and served by
    // the webserver
    assetFilesToPublish        : [
      frontend + 'lib/assets/**/*'
    ],

    frontendFilesToWatch       : [
      frontend + 'main.js',
      frontend + 'bootstrap.js',
      frontend + 'lib/**/*.js',
      '!' + frontend + '**/*.spec.js',
      frontend + 'main.html',
      frontend + 'lib/**/*.html',
      frontend + 'lib/config/styles/main.scss',
      '!' + frontend + '**/*_scsslint_*',
      '!' + frontend + '**/*.css.map'
    ],

    /*
     * Options
     */

    sassOptions                : {
      errLogToConsole : true
    },

    autoprefixerOptions        : {
      browsers : [ 'last 2 version', '> 5%' ]
    },

    ngAnnotateOptions          : {
      remove        : false,
      add           : true,
      single_quotes : true // jscs:disable
    },

    injectOptions              : {
      relative   : true,
      ignorePath : '/front/'
    },

    inlineSourceOptions        : {
      compress: false
    }
  };
};
