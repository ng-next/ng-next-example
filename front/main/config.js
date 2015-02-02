System.config({
  "paths": {
    "*": "*.js",
    "app/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "ng-next-frontend/*": "lib/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.11",
    "angular-animate": "github:angular/bower-angular-animate@1.3.11",
    "angular-aria": "github:angular/bower-angular-aria@1.3.11",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.10",
    "angular-material": "github:angular/bower-material@0.7.1",
    "angular-messages": "npm:angular-messages@1.3.36",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.10",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "jsonp": "npm:jsonp@0.1.0",
    "lodash": "npm:lodash@2.4.1",
    "nn-ng-utils": "github:ng-next/nn-ng-utils@master",
    "test-doubles-angular": "./test-doubles/angular/index",
    "test-doubles-formsdemo-service": "./lib/formsdemo/services/test-doubles/index",
    "test-doubles-log-service": "./lib/cross-cutting/log-service/test-doubles/index",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-animate@1.3.11": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-aria@1.3.11": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-cookies@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-angular-mocks@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.11"
    },
    "github:angular/bower-material@0.7.1": {
      "angular": "github:angular/bower-angular@1.3.11",
      "angular-animate": "github:angular/bower-angular-animate@1.3.11",
      "angular-aria": "github:angular/bower-angular-aria@1.3.11",
      "css": "github:systemjs/plugin-css@0.1.0"
    },
    "github:jspm/nodelibs-fs@0.1.0": {
      "assert": "npm:assert@1.3.0",
      "fs": "github:jspm/nodelibs-fs@0.1.0"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "github:jspm/nodelibs-tty@0.1.0": {
      "tty-browserify": "npm:tty-browserify@0.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:angular-messages@1.3.36": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:debug@2.1.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.0",
      "ms": "npm:ms@0.6.2",
      "net": "github:jspm/nodelibs-net@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.0",
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
      "process": "github:jspm/nodelibs-process@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

