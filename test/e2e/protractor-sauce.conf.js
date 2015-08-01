var config = require( '../../tasks/gulp-config' )();
var _ = require( 'lodash' );
var defaultConfig = require( './protractor-default.conf' );
var sauceConfig = {
  // this is optional: default is ondemand.saucelabs.com:80/wd/hub, but
  // localhost:4445/wd/hub is also valid for when you're running sc locally
  // and ondemand doesn't work
  //sauceSeleniumAddress: '',

  sauceUser    : process.env.SAUCE_USERNAME,
  sauceKey     : process.env.SAUCE_ACCESS_KEY,

  capabilities : {
    'tunnel-identifier' : process.env.TRAVIS_JOB_NUMBER || config.sauceTunnelId,
    tags                : [
      process.env.TRAVIS_PULL_REQUEST || 'no pull request',
      process.env.TRAVIS_BRANCH || 'no branch'
    ],
    build               : process.env.TRAVIS_BUILD_NUMBER || 'local build'
  }
};

var resultingConfig = _.defaultsDeep( defaultConfig, sauceConfig );
var configToLog = _.cloneDeep( resultingConfig );

if ( configToLog.sauceKey ) {
  configToLog.sauceKey = 'not being logged out';
}

console.log( 'using protractor _saucelabs_ config: ' +
  JSON.stringify( configToLog ));

exports.config = resultingConfig;
