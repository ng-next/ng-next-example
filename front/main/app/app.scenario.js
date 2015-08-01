/* global describe, browser, it, expect */
'use strict';

var common = require( './common.page' );

describe( 'app' , function () {
  beforeEach( function () {
    common.get( '/' );
  });

  it( 'should display the title "ng-next"' , function () {
    expect( browser.getTitle()).toEqual( 'ng-next' );
  });
});
