System.config({
  "paths": {
    "*": "*.js",
    "app/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "meta": {
    "github:hammerjs/hammer.js@2.0.4/hammer": {
      "format": "global"
    }
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.10",
    "angular-animate": "github:angular/bower-angular-animate@1.3.10",
    "angular-aria": "github:angular/bower-angular-aria@1.3.10",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.10",
    "angular-material": "github:angular/bower-material@0.7.0",
    "angular-messages": "npm:angular-messages@1.3.36",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.10",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "lodash": "npm:lodash@2.4.1",
    "nn-ng-helper": "./lib/core/angular/index",
    "test-doubles-angular": "./test-doubles/angular/index",
    "test-doubles-formsdemo-service": "./lib/formsdemo/services/test-doubles/index",
    "test-doubles-log-service": "./lib/cross-cutting/log-service/test-doubles/index",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-angular-animate@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-angular-aria@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-angular-cookies@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-material@0.7.0": {
      "angular": "github:angular/bower-angular@1.3.10",
      "angular-animate": "github:angular/bower-angular-animate@1.3.10",
      "angular-aria": "github:angular/bower-angular-aria@1.3.10",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:angular/bower-material@0.7.0-rc3": {
      "angular": "github:angular/bower-angular@1.3.10",
      "angular-animate": "github:angular/bower-angular-animate@1.3.10",
      "angular-aria": "github:angular/bower-angular-aria@1.3.10",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:angular-messages@1.3.36": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    },
    "npm:lodash@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

