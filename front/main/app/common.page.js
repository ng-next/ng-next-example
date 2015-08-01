/* global browser, by */
var layoutPage = require( './layout/layout.page' );
var baseUrl;

browser.getProcessedConfig().then( function ( config ) {
  baseUrl = config.baseUrl;
});

// we have to do it this way because our app needs to bootstrap manually
// instead of using the ng-app attribute (which protractor could handle
// automatically)
// see: https://angular.github.io/protractor/#/system-setup
// https://stackoverflow.com/questions/22072327/how-can-i-wait-for-a-condition
// or google for "protractor manual bootstrap"
var get = function ( url ) {
  browser.driver.get( baseUrl + url );
  browser.driver.wait( function () {
    return browser.driver.isElementPresent(
      by.id( 'rootstate' ));
  });
  browser.waitForAngular();
};

module.exports = {
  get         : get,
  mainContent : layoutPage.mainContent
};
