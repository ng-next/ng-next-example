var config = require( '../../tasks/gulp-config' )();
var port = process.env.PORT || config.nodeServerDefaultPort;

module.exports = {
  baseUrl                    : 'http://127.0.0.1:' + port + '/#',
  framework                  : 'jasmine2',
  restartBrowserBetweenTests : false,
  allScriptsTimeout          : 10000,
  verbose                    : true,

  jasmineNodeOpts            : {
    isVerbose              : true,
    showColors             : true,
    includeStackTrace      : true,
    defaultTimeoutInterval : 30000
  }
};
