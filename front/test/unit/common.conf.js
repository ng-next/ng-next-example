//noinspection BadExpressionStatementJS
'use strict';

var defaultConfig;

module.exports = function () {
  defaultConfig = {
    basePath   : '../../..',

    // https://npmjs.org/browse/keyword/karma-adapter
    frameworks : ['mocha', 'chai', 'sinon-chai', 'jspm'],

    files   : [
      //Usually files are included in karma via the files: [] configuration.
      // When using karma-jspm, one should not also include files in this configuration
      // ... except for stuff that should run before anything else ;)
      'front/test/unit/test-main.js'
    ],
    exclude : [
      'front/main/main.js',
      'front/main/lib/cross-cutting/exception/exception-handler-service.js',
      '**/*_scsslint_*'
    ],

    jspm      : {
      config     : '/front/main/config.js',
      packages   : '/front/main/jspm_packages/',
      loadFiles  : [
        'front/main/lib/**/*.spec.js'
      ],
      serveFiles : [
        'front/main/lib/**/*',
        'front/test/unit/test-doubles/**/*'
        //'front/main/build.js'
      ]
    },

    proxies   : {
      '/base/build.js'       : '/base/front/main/build.js',
      '/base/jspm_packages/' : '/base/front/main/jspm_packages/',
      '/base/lib/'           : '/base/front/main/lib/',
      '/base/test-doubles/'  : '/base/front/test/unit/test-doubles/'
    },

    // https://npmjs.org/browse/keyword/karma-launcher
    browsers  : ['Chrome'],

    singleRun : false,

    // https://npmjs.org/browse/keyword/karma-reporter
    reporters : ['progress'],

    mochaReporter : {
    },

    client: {
      captureConsole: true,
      mocha: {
        bail: false
      }
    },

    port          : 9876,
    colors        : true,
    autoWatch     : true
  };

  return defaultConfig;
};
