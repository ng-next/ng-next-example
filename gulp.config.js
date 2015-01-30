/* global module */
module.exports = function () {
  return {

    // all js files to vet
    alljs                     : [
      'gulpfile.js',
      'front/main/**/*.js',
      '!front/main/jspm_packages/**/*',
      '!front/main/dist/**/*',
      '!front/main/build.js',
      '!front/main/config.js'
    ],

    // all files produced by the build task
    buildArtifacts            : [
      'front/main/build.*'
      // becomes functional as soon as we make use of sass
      //,
      //'front/main/index.css'
    ],

    publicFolderAndSubfolders : [
      'public/**'
    ],

    // all files that should be copied to the public folder and served by
    // the webserver
    sourceFilesToPublish      : [
      'front/main/favicon.ico',
      'front/main/*.js',
      'front/main/*.js.map',
      'front/main/index.*'
    ],

    // publically accessable folder that should be served by the webserver
    publicFolder              : [
      'public'
    ],

    // all assets that should be copied to the public asset folder and served by
    // the webserver
    assetFilesToPublish       : [
      'front/main/lib/assets/**/*'
    ],

    // publically accessable folder that should be served by the webserver
    publicAssetFolder         : [
      'public/lib/assets'
    ],

    frontendFilesToWatch      : [
      'front/main/**/*',
      'front/main/lib/**/*.scss',
      '!front/main/**/*_scsslint_*',
      '!front/main/**/*.css.map',
      '!front/main/dist/**/*',
      '!front/main/jspm_packages/**',
      '!front/main/build.*',
      '!front/main/index.css',
      '!front/main/config.js',
      '!front/main/package.json',
      '!front/main/**/*.spec.js'
    ]
  };
};
