var config = require( '../../tasks/gulp-config' )();
var _ = require( 'lodash' );
var defaultConfig = require( './protractor-default.conf' );

var scNamePrefix = 'Protractor Tests ' + ( process.env.TRAVIS_JOB_NUMBER ?
  '- CI' : '- local' ) + ( process.env.SAUCE_USERNAME ? ' - sauce' : null );

var scCapabilities = {
  'tunnel-identifier' : process.env.TRAVIS_JOB_NUMBER || config.sauceTunnelId,
  tags                : [
    'PR: ' + ( process.env.TRAVIS_PULL_REQUEST || 'no pull request' ),
    'branch: ' + ( process.env.TRAVIS_BRANCH || 'no branch' )
  ],
  build               : process.env.TRAVIS_BUILD_NUMBER || 'local build'
};

var sauceConfig = {
  // this is optional: default is ondemand.saucelabs.com:80/wd/hub, but
  // localhost:4445/wd/hub is also valid for when you're running sc locally
  // and ondemand doesn't work
  //sauceSeleniumAddress: '',

  sauceUser         : process.env.SAUCE_USERNAME,
  sauceKey          : process.env.SAUCE_ACCESS_KEY,

  //capabilities : _.assign(
  //  { browserName : 'chrome', name : scCapabilities.name + ' - chrome' },
  //  scCapabilities
  //),

  multiCapabilities : [
    {
      browserName : 'chrome',
      platform    : 'MAC',
      name        : scNamePrefix + ' - chrome - MAC'
    },
    {
      browserName : 'chrome',
      platform    : 'WINDOWS',
      name        : scNamePrefix + ' - chrome - WINDOWS'
    },
    {
      browserName : 'chrome',
      platform    : 'LINUX',
      name        : scNamePrefix + ' - chrome - LINUX'
    },
    {
      browserName : 'internet explorer',
      version     : '11',
      platform    : 'WINDOWS 8.1',
      name        : scNamePrefix + ' - internet explorer 11'
    },
    {
      browserName : 'firefox',
      platform    : 'WINDOWS',
      name        : scNamePrefix + ' - firefox - WINDOWS'
    },
    {
      browserName : 'firefox',
      platform    : 'MAC',
      name        : scNamePrefix + ' - firefox - MAC'
    },
    {
      browserName : 'firefox',
      platform    : 'LINUX',
      name        : scNamePrefix + ' - firefox - LINUX'
    },
    {
      browserName : 'android',
      name        : scNamePrefix + ' - android'
    },
    {
      browserName : 'safari',
      version     : '8',
      platform    : 'MAC',
      name        : scNamePrefix + ' - safari - MAC'
    },
    {
      browserName : 'iPhone',
      version     : '8',
      name        : scNamePrefix + ' - iPhone'
    },
    {
      browserName : 'iPad',
      version     : '8',
      name        : scNamePrefix + ' - iPad'
    }
  ],

  maxSessions       : -1

  // https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
  // browsername:
  // android|chrome|firefox|htmlunit|internet explorer|iPhone|iPad|opera|safari
  // platform: WINDOWS|XP|VISTA|MAC|LINUX|UNIX|ANDROID
};

_.each( sauceConfig.multiCapabilities, function ( c ) {
  _.assign( c, scCapabilities );
});

var resultingConfig = _.defaultsDeep( defaultConfig, sauceConfig );
var configToLog = _.cloneDeep( resultingConfig );

if ( configToLog.sauceKey ) {
  configToLog.sauceKey = 'not being logged out';
}

console.log( 'using protractor _saucelabs_ config: ' +
  JSON.stringify( configToLog ));

exports.config = resultingConfig;
