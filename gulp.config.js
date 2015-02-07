/* global module */
/* jshint node:true */

var path = require( 'path' );

module.exports = function () {
  var frontendTest           = 'front/test/';
  var frontend               = 'front/main/';
  var frontendApp            = 'front/main/app/';
  var frontendLib            = 'front/main/lib/';
  var backend                = 'back/';
  // 'public' is a reserved word, thus 'publicFolder'
  var publicFolder           = 'public/';
  var publicApp              = 'public/app/';
  var mainJs                 = [
    frontend + 'main.js',
    frontend + 'bootstrap.js'
  ];
  var jsBuildMainFile        = 'app.js';
  var jsBuildLibFile         = 'lib.js';
  var jsTargetFolder         = frontend;
  var styles                 = [
    frontend + 'main.scss',
    frontend + '**/*.scss'
  ];
  var stylesBuildFile        = 'app.css';
  var stylesTargetFolder     = frontend;
  var html                   = frontend + 'main.html';
  var htmlBuildFile          = 'index.html';
  var htmlTargetFolder       = frontend;
  var reports                = './reports/';
  var jspmLibs               = [
    'text',
    'css',
    'angular',
    'angular-animate',
    'angular-aria',
    'angular-cookies',
    'angular-material',
    'angular-messages',
    'angular-ui-router',
    'jsonp',
    'lodash',
    'nn-ng-utils'
  ];

  var config = {

    /*
     * Files Paths
     */

    absolutePathToFrontend     : ( path.join( process.cwd(), frontend )),

    frontend                   : frontend,

    frontendApp                : frontendApp,

    // publically accessable folder that should be served by the webserver
    public                     : publicFolder,

    publicApp                  : publicApp,

    publicAssets               : publicApp + 'assets/',

    // output folder of the css preprocessing
    stylesTargetFolder         : stylesTargetFolder,

    htmlTargetFolder           : htmlTargetFolder,

    // output folder of the js concat and minification processing
    jsTargetFolder             : jsTargetFolder,

    /*
     * Build Artifact Files
     */

    jsBuildMainFile            : jsBuildMainFile,
    jsBuildLibFile             : jsBuildLibFile,

    jsBuildFiles               : [
      ( jsTargetFolder + jsBuildMainFile ),
      ( jsTargetFolder + jsBuildMainFile.replace( '.js', '.js.map' )),
      ( jsTargetFolder + jsBuildLibFile ),
      ( jsTargetFolder + jsBuildLibFile.replace( '.js', '.js.map' ))
    ],

    stylesBuildFile            : stylesBuildFile,

    htmlBuildFile              : htmlBuildFile,

    reports                    : reports,

    /*
     * jspm
     */

    jspmLibsToSubtract         : jspmLibsToSubtract( jspmLibs ),

    jspmLibsToBundle           : jspmLibsToBundle( jspmLibs ),

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
      '!' + frontendLib + '**/*.*',
      '!' + frontend + jsBuildMainFile,
      '!' + frontend + jsBuildLibFile,
      '!' + frontend + 'config.js',
      backend + '**/*.js',
      '!' + backend + 'node_modules/**/*.*'
    ],

    // all backend source files that trigger a server restart when changed
    backendFilesToWatch        : [
      backend + 'app.js'
    ],

    /*
     * inject into html */

    stylesToIncludeInSfxBundle : [
      frontendLib + 'github/angular/bower-material@0.7.1/angular-material.css', // jscs: disable
      stylesTargetFolder + stylesBuildFile
    ],

    jsToIncludeInSfxBundle     : [
      frontendLib + 'traceur-runtime.js',
      frontend + jsBuildMainFile,
      frontend + jsBuildLibFile
    ],

    jsToIncludeInDefaultBundle : [
      frontendLib + 'system.js',
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
      frontendApp + 'assets/**/*.*'
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
      '!' + frontend + '**/*.spec.js',

      // app
      frontendApp + '/**/*.*',
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

      // app
      styles, // styles are part of main partition and are part of app, too
      frontendApp + '**/*.*',
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
      jspmPackages  : '/' + frontendLib,
      loadFiles     : [
        frontendApp + '**/*.spec.js'
      ],
      serveFiles    : [
        frontendApp + '**/*',
        frontendTest + 'unit/test-doubles/**/*'
      ],
      exclude       : [
        frontend + 'main.js',
        frontendApp + 'cross-cutting/exception/exception-handler-service.js',
        '**/*_scsslint_*'
      ],
      proxies       : {
        //'/base/build.js'       : '/base/' + frontend + 'build.js',
        '/base/lib/'           : '/base/' + frontendLib,
        '/base/app/'           : '/base/' + frontendApp,
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

  function jspmLibsToSubtract ( jspmLibs ) {
    var libsToSubtract = '';
    var arrayLength = jspmLibs.length;

    for ( var i = 0; i < arrayLength; i += 1 ) {
      libsToSubtract += ' - ' + jspmLibs[ i ];
    }

    return libsToSubtract;
  }

  function jspmLibsToBundle ( jspmLibs ) {
    var libsToBundle = '';
    var arrayLength = jspmLibs.length;

    if ( arrayLength >= 1 ) {
      libsToBundle += jspmLibs[ 0 ];
    }

    for ( var i = 1; i < arrayLength; i += 1 ) {
      libsToBundle += ' + ' + jspmLibs[ i ];
    }

    return libsToBundle;
  }
};
