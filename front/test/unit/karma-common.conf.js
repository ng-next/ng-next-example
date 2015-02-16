//noinspection BadExpressionStatementJS
'use strict';

var defaultConfig;
// TODO: link module
var gulpConf = require( './../../../tasks/gulp-config' )();

module.exports = function () {
  defaultConfig = {
    basePath         : '../../..',

    // https://npmjs.org/browse/keyword/karma-adapter
    //frameworks       : [ 'mocha', 'chai', 'sinon-chai', 'jspm', 'traceur' ],
    frameworks       : [
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon-chai',
      'jspm'
    ],

    files            : [
      //Usually files are included in karma via the files: [] configuration.
      // When using karma-jspm, one should not also include files in this
      // configuration .. except for stuff that should run before anything else
      'front/test/unit/test-main.js'
      //,
      //'node_modules/6to5/browser-polyfill.js'
    ],
    exclude          : gulpConf.karmaOptions.exclude,

    jspm             : {
      config     : gulpConf.karmaOptions.jspmConfig,
      packages   : gulpConf.karmaOptions.jspmPackages,
      loadFiles  : gulpConf.karmaOptions.loadFiles,
      serveFiles : gulpConf.karmaOptions.serveFiles
    },

    proxies          : gulpConf.karmaOptions.proxies,

    //preprocessors    : gulpConf.karmaOptions.preprocessors,

    // https://npmjs.org/browse/keyword/karma-launcher
    browsers         : [ 'PhantomJS' ],

    singleRun        : false,

    /*
     * coverage reporter doesn't yet support ES6 code
     * TODO: run coverage on transpiled code
     */

    // https://npmjs.org/browse/keyword/karma-reporter
    reporters        : [ 'progress' ],
    //reporters        : [ 'progress', 'coverage' ],

    //coverageReporter : {
    //  dir       : gulpConf.karmaOptions.coverage.dir,
    //  reporters : gulpConf.karmaOptions.coverage.reporters
    //},

    coverageReporter : {
      // configure the reporter to use isparta for JavaScript coverage
      //instrumenters: { isparta : require('isparta') },
      //instrumenter: {
      //  '**/*.js': 'isparta'
      //},
      //
      //instrumenterOptions: {
      //  isparta: {
      //    to5 : { experimental: true }
      //  }
      //},
      //
      //reporters : gulpConf.karmaOptions.coverage.reporters
      //[
      //  {
      //    type: 'text',
      //    subdir: normalizationBrowserName
      //  },
      //  {
      //    type: 'html',
            // TODO: chagne dir !!
      //    dir: 'coverage/',
      //    subdir: normalizationBrowserName
      //  }
      //]
    },

    //'6to5Preprocessor': {
    //  options : { experimental: true }
    //},
    //
    //traceurPreprocessor: {
    //  options : {
    //    sourceMaps : false,
    //    modules    : 'instantiate'
    //  }
    //},

    mochaReporter    : {
    },

    client           : {
      captureConsole : true,
      mocha          : {
        bail : false
      }
    },

    port             : 9876,
    colors           : true,
    autoWatch        : true
  };

  return defaultConfig;
};

//function normalizationBrowserName ( browser ) {
//  return browser.toLowerCase().split( /[ /-]/ )[0];
//}
