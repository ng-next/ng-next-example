/* global browser */
'use strict';

var common = require( '../../../common.page' );
var movieListPage = require( './movie-list.page' );
var movieCreatePage = require( '../movie-detail-state/movie-detail.page' );

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

  it( 'should display an added movie in the list', function () {
    movieListPage.goToNewMoviePage();
    movieCreatePage.setTitle( 'King Kong' );
    movieCreatePage.setDirector( 'John Guillermin' );
    movieCreatePage.setYear( '1976' );
    movieCreatePage.uploadImage1();
    movieCreatePage.saveData();

    expect( movieListPage.movieTitles.getText()).toContain( 'King Kong' );
    expect( movieListPage.movieDirectors.getText())
      .toContain( 'John Guillermin' );
    expect( movieListPage.movieYears.getText()).toContain( '1976' );
  });
});
