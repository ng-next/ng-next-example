/* global element, by */

'use strict';

var Layout = function () {
  this.mainContent = element( by.id( 'main-content' ));
};

module.exports = new Layout();
