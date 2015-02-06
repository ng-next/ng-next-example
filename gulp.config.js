/* global module */
/* jshint node:true */

var path = require( 'path' );

module.exports = function () {
  var frontend               = 'front/main/';
  var frontendTest           = 'front/test/';
  var backend                = 'back/';
  var servedFolder           = 'public/';
  var mainJs                 = [
    frontend + 'main.js',
    frontend + 'bootstrap.js'
  ];
  var jsBuildFile            = 'build.js';
  var jsTargetFolder         = frontend;
  var styles                 = [
    frontend + 'main.scss',
    frontend + '**/*.scss'
  ];
  var stylesBuildFile        = 'main.css';
  var stylesTargetFolder     = frontend;
  var html                   = frontend + 'main.html';
  var htmlBuildFile          = 'index.html';
  var htmlTargetFolder       = frontend;
  var reports                = './reports/';

  var config = {

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
     * Build Artifact Files
     */

    jsBuildFile                : jsBuildFile,

    jsBuildFiles               : [
      ( jsTargetFolder + jsBuildFile ),
      ( jsTargetFolder + jsBuildFile.replace( '.js', '.js.map' ))
    ],

    stylesBuildFile            : stylesBuildFile,

    htmlBuildFile              : htmlBuildFile,

    reports                    : reports,

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

    mainStyle                  : frontend + 'main.scss',

    styles                     : styles,

    html                       : html,

    // all js files to vet
    alljs                      : [
      'gulpfile.js',
      'gulp.config.js',
      frontend + '**/*.js',
      '!' + frontend + 'jspm_packages/**/*.*',
      '!' + frontend + 'build.js',
      '!' + frontend + 'config.js'
    ],

    // all backend source files that trigger a server restart when changed
    backendFilesToWatch        : [
      backend + 'app.js'
    ],

    /*
     * inject into html */

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

    /*
     * copy to folder that's served to the public */

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

    /*
     * BrowserSync
     */

    browserSyncReloadDelay     : 1000,

    // watched files in dev mode that trigger a browser reload
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

    // watched files in build modes that trigger a complete (re)build
    gulpWatchFilesBuild        : mainJs.concat(
      // main partition
      html,   // this is (currently) just the html in the main partition
      frontend + 'favicon.ico',

      // lib
      styles, // styles are part of main partition and are part of lib, too
      frontend + 'lib/**/*.*',
      '!' + frontend + '**/*.spec.js'
        // style files are included because they must trigger a rebuild
    ),

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
    },

    /*
     * Testing
     */

    karmaConfig                : '/' + frontendTest + 'unit/karma.conf.js',

    serverIntegrationTests     : [
      __dirname + '/' + frontendTest + 'integration/**/*.spec.js'
    ]
  };

  config.karmaOptions = getKarmaOptions();

  return config;

  /////////////////////

  function getKarmaOptions () {
    var options = {
      jspmConfig    : '/' + frontend + 'config.js',
      jspmPackages  : '/' + frontend + 'jspm_packages/',
      loadFiles     : [
        frontend + 'lib/**/*.spec.js'
      ],
      serveFiles    : [
        frontend + 'lib/**/*',
        frontendTest + 'unit/test-doubles/**/*'
      ],
      exclude       : [
        frontend + 'main.js',
        frontend + 'lib/cross-cutting/exception/exception-handler-service.js',
        '**/*_scsslint_*'
      ],
      proxies       : {
        '/base/build.js'       : '/base/' + frontend + 'build.js',
        '/base/jspm_packages/' : '/base/' + frontend + 'jspm_packages/',
        '/base/lib/'           : '/base/' + frontend + 'lib/',
        '/base/test-doubles/'  : '/base/' + frontendTest + 'unit/test-doubles/'
      },
      coverage      : {
        dir       : reports + 'coverage',
        reporters : [
          { type : 'html', subdir : 'report-html' },
          { type : 'lcov', subdir : 'report-lcov' },
          { type : 'text-summary' /* omitting filename outputs to console */ }
        ]
      },
      preprocessors : {}
    };

    options.preprocessors[ frontend + '**/!(*.spec)+(*.js)' ] = [ 'coverage' ];

    return options;
  }
};
