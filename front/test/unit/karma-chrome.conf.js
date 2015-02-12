/* global module */
/* jshint node: true */
//noinspection BadExpressionStatementJS
'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var defaultConfig;
var getCommonConfig = require( './karma-common.conf.js' );

function commonConfigExists () {
  return !fs.existsSync( path.resolve( __dirname, './karma-common.conf.js' ));
}
module.exports = function ( config ) {
  if ( commonConfigExists()) {
    console.log( 'Create file common.conf.js in "' + process.cwd() +
      '" that returns the default config object!' );
    process.exit( 1 );
  } else {
    defaultConfig = getCommonConfig();
  }

  // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
  // config.LOG_INFO || config.LOG_DEBUG
  defaultConfig.logLevel = config.LOG_INFO;

  defaultConfig.browsers = [ 'Chrome' ];

  config.set( defaultConfig );
};
