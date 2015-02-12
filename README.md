[![Build Status](https://travis-ci.org/ng-next/ng-next-example.svg?branch=master)](https://travis-ci.org/ng-next/ng-next-example)
[![Code Climate](https://codeclimate.com/github/ng-next/ng-next-example/badges/gpa.svg)](https://codeclimate.com/github/ng-next/ng-next-example)
[![Test Coverage](https://codeclimate.com/github/ng-next/ng-next-example/badges/coverage.svg)](https://codeclimate.com/github/ng-next/ng-next-example)
[![Dependency Status](https://gemnasium.com/ng-next/ng-next-example.svg)](https://gemnasium.com/ng-next/ng-next-example)

# ng-next
angular jspm material-design example

ng-next is AngularJS 1.x using ...

- jspm.
  - jspm is a package manager for the SystemJS universal module loader, built on
  top of the dynamic ES6 module loader
  - Load any module format (ES6, AMD, CommonJS and globals) directly from any
 endpoint such as npm and github with flat versioned dependency management.
  - For development, load modules as separate files with ES6 and plugins
 compiled in the browser.
  - For production, optimize into a bundle, layered bundles or a self-executing
 bundle with a single command."
- angular material design
- ES6 classes for controllers and services
- Controller As syntax
- abstracts away angular modules in favor of ES6 modules (import)

... trying to make it easy to migrate to Angular 2.x at some point in the future.

## Installation
have the following node modules installed globally:
- jspm, gulp

`git clone git@github.com:ng-next/ng-next-example.git`

`cd ng-next-example`

`npm install`

`gulp serve-dev`

tested with just Google Chrome browser (for now).

### build-standalone-html
build everything into a single html file.

`gulp build-standalone-html`

`npm start`

browse to `localhost:3000`

## Tests

`gulp test` or `npm test`

### running tests in Jetbrains Webstorm IDE
currently some strange things happen when running tests within Webstom. So
for the moment make sure to only run tests on the command line. We're working
 on it.
