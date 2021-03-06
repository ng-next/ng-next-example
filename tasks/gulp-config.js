/* global module */
/* jshint node:true */

var path = require( 'path' );

module.exports = function () {
  var root                     = './';
  var frontendTest             = 'front/test/';
  var frontend                 = 'front/main/';
  var frontendApp              = 'front/main/app/';
  var frontendLib              = 'front/main/lib/';
  var backend                  = 'back/';
  // 'public' is a reserved word, thus 'publicFolder'
  var publicFolder             = 'public/';
  var publicApp                = 'public/app/';
  var mainJs                   = [
    frontend + 'main.js',
    frontend + 'bootstrap.js'
  ];
  var buildFolder              = frontend;
  var jsBuildMainFile          = 'app.js';
  var jsBuildLibFile           = 'lib.js';
  // babel external-helpers currently not needed
  //var es6RuntimeFile           = 'external-helpers.js';
  var jsBuildConstantsNgConfig = frontendApp + 'config/constants-ng-config.js';
  var jsTargetFolder           = buildFolder;
  var styles                   = [
    frontend + 'main.scss',
    frontend + '**/*.scss'
  ];
  var stylesBuildFile          = 'app.css';
  var html                     = frontend + 'main.html';
  var htmlBuildFile            = 'index.html';
  var htmlTargetFolder         = buildFolder;
  var reports                  = './reports/';
  var jspmLibs                 = [
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
    'nn-ng-utils',
    'localforage',
    'js-data',
    'js-data-angular',
    'js-data-localforage'
  ];

  var config = {

    packages                   : [
      './package.json'
    ],

    /*
     * Files Paths
     */
    root                       : root,

    absolutePathToFrontend     : ( path.join( process.cwd(), frontend )),

    frontend                   : frontend,

    frontendApp                : frontendApp,

    frontendLib                : frontendLib,

    // publically accessable folder that should be served by the webserver
    public                     : publicFolder,

    publicApp                  : publicApp,

    publicAssets               : publicApp + 'assets/',

    publicLib                  : publicFolder + 'lib/',

    // output folder of the css preprocessing
    buildFolder                : buildFolder,

    htmlTargetFolder           : htmlTargetFolder,

    /*
     * Build Artifact Files
     */

    jsBuildMainFile            : jsBuildMainFile,
    jsBuildLibFile             : jsBuildLibFile,

    jsConstantsNgConfig        : frontendApp +
      'config/constants-ng-config.pre.js',

    jsBuildConstantsNgConfig   : jsBuildConstantsNgConfig,

    jsBuildFiles               : [
      ( jsTargetFolder + jsBuildMainFile ),
      ( jsTargetFolder + jsBuildMainFile.replace( '.js', '.js.map' )),
      ( jsTargetFolder + jsBuildLibFile ),
      ( jsTargetFolder + jsBuildLibFile.replace( '.js', '.js.map' )),
      jsBuildConstantsNgConfig
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

    nodeServerDefaultPort      : 3000,

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
    jsToVet                    : [
      '**/*.js',
      '!node_modules/**',
      '!back/node_modules/**',
      '!' + frontendLib + '**'
    ],

    // all backend source files that trigger a server restart when changed
    backendFilesToWatch        : [
      backend + 'app.js'
    ],

    /*
     * inject into html */

    jsToIncludeInHtmlSfx       : [
      // babel external-helpers currently not needed
      //frontend + es6RuntimeFile,
      frontend + jsBuildMainFile
    ],

    jsToIncludeInDefaultBundle : [
      // babel external-helpers currently not needed
      //frontend + es6RuntimeFile,
      frontendLib + 'system.js',
      frontend + 'config.js',
      // loading js build files manually (instead of using jspm'd --inject'
      // because we need to revision file names
      frontend + jsBuildLibFile,
      frontend + jsBuildMainFile,
      frontend + 'bootstrap.js'
    ],

    /*
     * copy to folder that's served to the public */

    // all files that should be copied to the public folder and served by
    // the webserver
    sourceFilesToPublish       : [
      frontend + 'favicon.ico',
      frontend + 'config.js',
      frontend + jsBuildLibFile,
      frontend + jsBuildMainFile,
      frontend + 'bootstrap.js',
      frontend + 'index.html',
      frontend + '*.js.map'
    ],

    runtimeLibToPublish        : [
      // babel external-helpers currently not needed
      //frontend + es6RuntimeFile
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

    browserSyncPort            : 5000,

    // watched files in dev mode that trigger a browser reload
    browserSyncFilesDev        : mainJs.concat(
      // main partition
        // reload browser only when styles/html build ( which gets triggered by
        // individual gulp watch tasks ) is ready
      frontend + stylesBuildFile,
      frontend + htmlBuildFile,
      frontend + 'favicon.ico',
      '!' + frontend + '**/*.spec.js',
      '!' + frontend + '**/*.scenario.js',
      '!' + frontend + '**/*.page.js',

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
      '!' + frontend + '**/*.spec.js',
      '!' + frontend + '**/*.scenario.js',
      '!' + frontend + '**/*.page.js'
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
    ],

    protractorLocalConfig      : root + '/test/e2e/protractor-local.conf.js',

    protractorSauceConfig      : root + '/test/e2e/protractor-sauce.conf.js',

    sauceTunnelId              : 'askl34bsdvfvtyui345gv8',

    e2eScenarios               : [
      frontendApp + '**/*.scenario.js',
      root + 'test/e2e/**/*.scenario.js'
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
        frontendApp + '**/!(*.spec)+(*.js)',
        frontendApp + '**/!(*.page)+(*.js)',
        frontendApp + '**/!(*.scenario)+(*.js)',
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

    //options.preprocessors[ frontendApp + '**/*.js)' ] =
    //  [ 'traceur' ];
    options.preprocessors[ frontendApp + '**/*.js)' ] =
      [ '6to5' ];
    options.preprocessors[ frontendApp + '**/!(*.spec)+(*.js)' ] =
      [ 'coverage' ];

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
