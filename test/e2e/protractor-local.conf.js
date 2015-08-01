var _ = require( 'lodash' );
var defaultConfig = require( './protractor-default.conf' );
var localConfig = {
  // Make use you check the version in the folder
  //seleniumServerJar          : './node_modules/protractor/selenium/' +
  //  'selenium-server-standalone-x.y.z.jar',
  seleniumAddress : 'http://127.0.0.1:4444/wd/hub',

  capabilities    : {
    browserName : 'chrome'
    //'chromeOptions': {
    //  'args': ['--disable-extensions']
    //},
  },

  directConnect   : true,

  onPrepare       : function () {
    //browser.driver.manage().window().maximize();
  }
};

var resultingConfig = _.defaultsDeep( defaultConfig, localConfig );
var configToLog = _.cloneDeep( resultingConfig );

if ( configToLog.sauceKey ) {
  configToLog.sauceKey = 'not being logged out';
}

console.log( 'used protractor _local_ config: ' +
  JSON.stringify( configToLog ));

exports.config = resultingConfig;
