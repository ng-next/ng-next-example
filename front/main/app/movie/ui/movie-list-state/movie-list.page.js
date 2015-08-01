/* global element, by, browser */

'use strict';

var MovieList = function () {
  this.newMovieButton = element( by.css( 'a[ui-sref="root.movie.detailnew"]' ));

  this.goToNewMoviePage = function () {
    this.newMovieButton.click();
    browser.waitForAngular();
  };
};

module.exports = new MovieList();
