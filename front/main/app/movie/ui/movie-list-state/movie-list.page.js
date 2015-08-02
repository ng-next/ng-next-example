/* global element, by, browser */

'use strict';

var MovieList = function () {
  this.newMovieButton = element( by.css( 'a[ui-sref="root.movie.detailnew"]' ));

  this.goToNewMoviePage = function () {
    this.newMovieButton.click();
    browser.waitForAngular();
  };

  this.movieTitles = element.all( by.repeater( 'movie in movieList.data' )
    .column( 'movie.title' ));

  this.movieDirectors = element.all( by.repeater( 'movie in movieList.data' )
    .column( 'movie.director' ));

  this.movieYears = element.all( by.repeater( 'movie in movieList.data' )
    .column( 'movie.year' ));
};

module.exports = new MovieList();
