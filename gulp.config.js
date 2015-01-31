/* global module */
module.exports = function () {
  var frontend = 'front/main/';
  var servedFolder = 'public/';

  return {

    /*
     * Files Paths
     */

    // publically accessable folder that should be served by the webserver
    publicFolder         : servedFolder,

    // public assets folder
    publicAssetFolder    : servedFolder + 'lib/assets',

    stylesTargetFolder   : frontend,

    jsTargetFolder       : frontend,

    /*
     * Source Files
     */

    sass                 : [
      frontend + 'lib/config/styles/main.scss'
    ],

    // all js files to vet
    alljs                : [
      'gulpfile.js',
      frontend + '**/*.js',
      '!' + frontend + 'jspm_packages/**/*',
      '!' + frontend + 'dist/**/*',
      '!' + frontend + 'build.js',
      '!' + frontend + 'config.js'
    ],

    // all files produced by the build task
    buildArtifacts       : [
      this.jsTargetFolder + 'build.*'
      // becomes functional as soon as we make use of sass
      //,
      //frontend + 'index.css'
    ],

    // all files that should be copied to the public folder and served by
    // the webserver
    sourceFilesToPublish : [
      frontend + 'favicon.ico',
      frontend + '*.js',
      frontend + '*.js.map',
      frontend + 'index.*'
    ],

    // all assets that should be copied to the public asset folder and served by
    // the webserver
    assetFilesToPublish  : [
      frontend + 'lib/assets/**/*'
    ],

    frontendFilesToWatch : [
      frontend + '**/*',
      frontend + 'lib/**/*.scss',
      '!' + frontend + '**/*_scsslint_*',
      '!' + frontend + '**/*.css.map',
      '!' + frontend + 'dist/**/*',
      '!' + frontend + 'jspm_packages/**',
      '!' + frontend + 'build.*',
      '!' + frontend + 'index.css',
      '!' + frontend + 'config.js',
      '!' + frontend + 'package.json',
      '!' + frontend + '**/*.spec.js'
    ]
  };
};
