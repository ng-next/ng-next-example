System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "app/*": "app/*.js",
    "github:*": "lib/github/*.js",
    "npm:*": "lib/npm/*.js",
    "ng-next-frontend/*": "app/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.4.3",
    "angular-animate": "github:angular/bower-angular-animate@1.4.3",
    "angular-aria": "github:angular/bower-angular-aria@1.4.3",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.13",
    "angular-material": "github:angular/bower-material@0.10.0",
    "angular-messages": "github:angular/bower-angular-messages@1.4.3",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.13",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "babel": "npm:babel-core@5.8.5",
    "babel-runtime": "npm:babel-runtime@5.8.5",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.13",
    "jsonp": "npm:jsonp@0.1.0",
    "lodash": "npm:lodash@2.4.1",
    "nn-ng-utils": "github:ng-next/nn-ng-utils@0.1.5",
    "test-doubles-angular": "./test-doubles/angular/index",
    "test-doubles-formsdemo-service": "./app/formsdemo/services/test-doubles/index",
    "test-doubles-log-service": "./app/cross-cutting/log-service/test-doubles/index",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-animate@1.4.3": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-aria@1.4.3": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-cookies@1.3.13": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-angular-mocks@1.3.13": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "github:angular/bower-material@0.10.0": {
      "angular": "github:angular/bower-angular@1.4.3",
      "angular-animate": "github:angular/bower-angular-animate@1.4.3",
      "angular-aria": "github:angular/bower-angular-aria@1.4.3",
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-tty@0.1.0": {
      "tty-browserify": "npm:tty-browserify@0.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:ng-next/nn-ng-utils@0.1.5": {
      "angular": "github:angular/bower-angular@1.4.3"
    },
    "npm:babel-runtime@5.8.5": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:debug@2.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ms": "npm:ms@0.6.2",
      "net": "github:jspm/nodelibs-net@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "tty": "github:jspm/nodelibs-tty@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jsonp@0.1.0": {
      "debug": "npm:debug@2.1.1"
    },
    "npm:lodash@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

