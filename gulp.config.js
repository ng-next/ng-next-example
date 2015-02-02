/* global module */
/* jshint node:true */

var path = require( 'path' );

module.exports = function () {
  var frontend               = 'front/main/';
  var servedFolder           = 'public/';
  var jsTargetFolder         = frontend;
  var jsBuildFile            = 'build.js';

  return {

    /*
     * Files Paths
     */

    absolutePathToFrontend : ( path.join( process.cwd(), frontend )),

    frontend               : frontend,

    // publically accessable folder that should be served by the webserver
    publicFolder           : servedFolder,

    publicAssetFolder      : servedFolder + 'lib/assets',

    // output folder of the css preprocessing
    stylesTargetFolder     : frontend,

    // output folder of the js concat and minification processing
    jsTargetFolder         : jsTargetFolder,

    /*
     * File Names
     */

    jsBuildFile            : jsBuildFile,

    stylesBuildFile        : 'main.css',

    /*
     * Source Files
     */

    sass                   : [
      frontend + 'lib/config/styles/main.scss'
    ],

    jsBuildFiles           : [
      ( jsTargetFolder + jsBuildFile ),
      ( jsTargetFolder + jsBuildFile.replace( '.js', '.map.js' ))
    ],

    // all js files to vet
    alljs                  : [
      'gulpfile.js',
      frontend + '**/*.js',
      '!' + frontend + 'jspm_packages/**/*',
      '!' + frontend + 'dist/**/*',
      '!' + frontend + 'build.js',
      '!' + frontend + 'config.js'
    ],

    // all files that should be copied to the public folder and served by
    // the webserver
    sourceFilesToPublish   : [
      frontend + 'favicon.ico',
      frontend + '*.js',
      frontend + '*.js.map',
      frontend + '*.css',
      frontend + '*.css.map',
      frontend + 'index.html'
    ],

    // all assets that should be copied to the public asset folder and served by
    // the webserver
    assetFilesToPublish    : [
      frontend + 'lib/assets/**/*'
    ],

    frontendFilesToWatch   : [
      frontend + '**/*',
      frontend + 'lib/**/*.scss',
      '!' + frontend + '**/*_scsslint_*',
      '!' + frontend + '**/*.css.map',
      '!' + frontend + 'dist/**/*',
      '!' + frontend + 'jspm_packages/**',
      '!' + frontend + 'build.*',
      '!' + frontend + 'index.css',
      '!' + frontend + 'config.js',
      '!' + frontend + 'package.json',
      '!' + frontend + '**/*.spec.js'
    ]
  };
};
