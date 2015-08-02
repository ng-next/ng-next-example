/* global element, by, browser */
'use strict';

var path = require( 'path' );
var remote = require( '../../../../../../node_modules/protractor/' +
  'node_modules/selenium-webdriver/remote' );

var MovieDetailPage = function () {
  this.title = element( by.model( 'movieCtrl.data.title' ));
  this.director = element( by.model( 'movieCtrl.data.director' ));
  this.year = element( by.model( 'movieCtrl.data.year' ));
  this.saveButton = element( by.buttonText( 'Save' ));
  this.fileInput = element( by.css( 'input[type="file"]' ));

  this.setTitle = function ( title ) {
    this.title.sendKeys( title );
  };

  this.setDirector = function ( director ) {
    this.director.sendKeys( director );
  };

  this.setYear = function ( year ) {
    this.year.sendKeys( year );
  };

  this.saveData = function () {
    this.saveButton.click();
    browser.waitForAngular();
  };

  this.uploadImage1 = function () {
    var fileToUpload = 'front/main/app/assets/images/king-kong.jpg';
    var absolutePath = path.join( process.cwd(), fileToUpload );

    browser.setFileDetector( new remote.FileDetector());
    this.fileInput.sendKeys( absolutePath );
    browser.waitForAngular();
  };
};

module.exports = new MovieDetailPage();
