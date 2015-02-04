/* global module */
/* jshint node:true */

var path = require( 'path' );

module.exports = function () {
  var frontend               = 'front/main/';
  var backend                = 'back/';
  var servedFolder           = 'public/';
  var mainJs                 = [
    frontend + 'main.js',
    frontend + 'bootstrap.js'
  ];
  var jsBuildFile            = 'build.js';
  var jsTargetFolder         = frontend;
  var styles                 = [ frontend + 'main.scss' ];
  var stylesBuildFile        = 'main.css';
  var stylesTargetFolder     = frontend;
  var html                   = frontend + 'main.html';
  var htmlBuildFile          = 'index.html';
  var htmlTargetFolder       = frontend;

  return {

    /*
     * Files Paths
     */

    absolutePathToFrontend     : ( path.join( process.cwd(), frontend )),

    frontend                   : frontend,

    // publically accessable folder that should be served by the webserver
    publicFolder               : servedFolder,

    publicAssetFolder          : servedFolder + 'lib/assets/',

    // output folder of the css preprocessing
    stylesTargetFolder         : stylesTargetFolder,

    htmlTargetFolder           : htmlTargetFolder,

    // output folder of the js concat and minification processing
    jsTargetFolder             : jsTargetFolder,

    /*
     * File Names
     */

    jsBuildFile                : jsBuildFile,

    stylesBuildFile            : stylesBuildFile,

    htmlBuildFile              : htmlBuildFile,

    /*
     * Node sesstings
     */

    nodeServerStartScript      : './back/app.js',

    nodeServerDefaultPort      : '3000',

    nodeEnvironments           : {
      development : 'development',
      production  : 'production'
    },

    /*
     * Source Files
     */

    styles                     : styles,

    html                       : html,

    jsBuildFiles               : [
      ( jsTargetFolder + jsBuildFile ),
      ( jsTargetFolder + jsBuildFile.replace( '.js', '.map.js' ))
    ],

    // all js files to vet
    alljs                      : [
      'gulpfile.js',
      'gulp.config.js',
      frontend + '**/*.js',
      '!' + frontend + 'jspm_packages/**/*.*',
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
      frontend + 'lib/assets/**/*.*'
    ],

    //frontendFilesToWatch       : [
    //  frontend + 'main.js',
    //  frontend + 'bootstrap.js',
    //  frontend + 'lib/**/*.js',
    //  '!' + frontend + '**/*.spec.js',
    //  frontend + 'main.html',
    //  frontend + 'lib/**/*.html',
    //  frontend + 'lib/config/styles/main.scss',
    //  '!' + frontend + '**/*_scsslint_*',
    //  '!' + frontend + '**/*.css.map'
    //],

    browserSyncFilesDev        : mainJs.concat(
      // main partition
        // reload browser only when styles/html build ( which gets triggered by
        // individual gulp watch tasks ) is ready
      frontend + stylesBuildFile,
      frontend + htmlBuildFile,
      frontend + 'favicon.ico',

      // lib
      frontend + 'lib/**/*.*',
      '!' + frontend + '**/*.spec.js',
        // reload browser only when styles build ( which gets triggered by
        // individual gulp watch task ) is ready
      '!' + frontend + '**/*.scss'
        // html files are not excluded because jspm bundels them into build file
    ),

    //browserSyncFilesProduction : [
    //  frontend + 'config.js',
    //  frontend + 'main.js',
    //  frontend + 'bootstrap.js',
    //  frontend + jsBuildFile,
    //  frontend + stylesBuildFile,
    //  frontend + htmlBuildFile
    //],

    gulpWatchFilesBuild        : mainJs.concat(
      // main partition
      styles, // styles are part of main partition and can be part of lib, too
      html,   // this is (currently) just the html in the main partition
      frontend + 'favicon.ico',

      // lib
      frontend + 'lib/**/*.*',
      '!' + frontend + '**/*.spec.js'
        // style files are included because they must trigger a rebuild
    ),

    backendFilesToWatch        : [
      backend + 'app.js'
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
