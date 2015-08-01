/* global browser */
'use strict';

var common = require( '../../../common.page' );
var movieListPage = require( './movie-list.page' );

describe( 'movieList', function () {
  beforeEach( function () {
    common.get( '/movies' );
  });

  it( 'should navigate to the new movie page when the add button is ' +
  'clicked', function () {
    movieListPage.goToNewMoviePage();

    expect( browser.getCurrentUrl()).toContain( '/new-movie' );
    expect( common.mainContent.getText()).toContain( 'Add a new movie' );
  });
});
