//noinspection BadExpressionStatementJS
'use strict';

var defaultConfig;
var gulpConf = require( './../../../gulp.config' )();

module.exports = function () {
  defaultConfig = {
    basePath         : '../../..',

    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks       : [ 'mocha', 'chai', 'sinon-chai', 'jspm' ],

    files            : [
      //Usually files are included in karma via the files: [] configuration.
      // When using karma-jspm, one should not also include files in this
      // configuration .. except for stuff that should run before anything else
      'front/test/unit/test-main.js'
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

    // https://npmjs.org/browse/keyword/karma-reporter
    reporters        : [ 'progress' ],

    /*
     * coverage reporter doesn't yet support ES6 code
     * TODO: run coverage on transpiled code
     */

    //reporters        : [ 'progress', 'coverage' ],
    coverageReporter : {
    //  dir       : gulpConf.karmaOptions.coverage.dir,
    //  reporters : gulpConf.karmaOptions.coverage.reporters
    },

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
