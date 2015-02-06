System.config({
  "paths": {
    "*": "*.js",
    "app/*": "app/*.js",
    "github:*": "lib/github/*.js",
    "npm:*": "lib/npm/*.js",
    "ng-next-frontend/*": "app/*.js"
  },
  "bundles": {
    "build": [
      "github:systemjs/plugin-text@0.0.2/text",
      "github:systemjs/plugin-text@0.0.2",
      "github:systemjs/plugin-css@0.1.0/css",
      "github:systemjs/plugin-css@0.1.0",
      "github:angular/bower-angular@1.3.12/angular.min",
      "github:angular-ui/ui-router@0.2.13/angular-ui-router",
      "github:angular/bower-angular-cookies@1.3.10/angular-cookies",
      "github:angular/bower-angular-animate@1.3.12/angular-animate",
      "npm:process@0.10.0/browser",
      "github:angular/bower-angular-aria@1.3.12/angular-aria",
      "github:ng-next/nn-ng-utils@0.1.2/nn-ng-modules",
      "github:ng-next/nn-ng-utils@0.1.2/nn-ng-configurations",
      "github:ng-next/nn-ng-utils@0.1.2/nn-register-ng-ui-state",
      "github:ng-next/nn-ng-utils@0.1.2/nn-register-ng-provider",
      "app/cross-cutting/auth/auth-service/auth-service",
      "app/cross-cutting/context-service/context-service",
      "app/cross-cutting/log-service/log-service",
      "app/cross-cutting/toast-service/md-toast-config",
      "app/cross-cutting/toast-service/md-toast-config-service",
      "app/cross-cutting/toast-service/custom-toast-controller",
      "app/cross-cutting/exception/exception-config-provider",
      "app/cross-cutting/exception/logging-exception-handler",
      "app/layout/root-state/nn-menu/nn-menu.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-menu-toolbar/nn-menu-toolbar.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-menu-content/nn-menu-content.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-menu-content/nn-menu-content-controller",
      "app/layout/root-state/nn-main/nn-main.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-main-content/nn-main-content.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-main-content/nn-main-content-controller",
      "app/layout/root-state/nn-main-toolbar/nn-main-toolbar.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/root-state/nn-main-toolbar/nn-main-toolbar-controller",
      "app/layout/root-state/root-state.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/nn-rootstate/nn-rootstate.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/nn-spinner/nn-spinner-service",
      "app/layout/nn-spinner/nn-spinner-ng-config",
      "app/layout/nn-spinner/nn-spinner.html!github:systemjs/plugin-text@0.0.2",
      "app/layout/nn-spinner/nn-spinner-controller",
      "app/authentication/ui/authentication-state/authentication-state.html!github:systemjs/plugin-text@0.0.2",
      "app/authentication/ui/authentication-login-state/authentication-login-state-controller",
      "app/authentication/ui/authentication-login-state/authentication-login-state.html!github:systemjs/plugin-text@0.0.2",
      "app/ngnext/ui/ngnext-welcome-state/ngnext-welcome-state-controller",
      "app/ngnext/ui/ngnext-welcome-state/ngnext-welcome-state.html!github:systemjs/plugin-text@0.0.2",
      "app/randomuser/ui/randomuser-state/randomuser-state.html!github:systemjs/plugin-text@0.0.2",
      "app/randomuser/ui/randomuser-list-state/randomuser-list-state-controller",
      "app/randomuser/ui/randomuser-list-state/randomuser-list-state.html!github:systemjs/plugin-text@0.0.2",
      "app/randomuser/gateways/randomuser-gateway",
      "app/formsdemo/ui/formsdemo-state/formsdemo-state-controller",
      "app/formsdemo/ui/formsdemo-state/formsdemo-state.html!github:systemjs/plugin-text@0.0.2",
      "npm:lodash@2.4.1/dist/lodash",
      "app/formsdemo/gateways/formsdemo-gateway",
      "app/formsdemo/nn-formsdemo-widget/nn-formsdemo-widget.html!github:systemjs/plugin-text@0.0.2",
      "app/formsdemo/nn-formsdemo-widget/nn-formsdemo-widget-controller",
      "app/reddit/ui/reddit-state/reddit-state.html!github:systemjs/plugin-text@0.0.2",
      "npm:ms@0.6.2/index",
      "app/reddit/ui/reddit-perfectloops-state/reddit-perfectloops-state.html!github:systemjs/plugin-text@0.0.2",
      "app/config/constants-ng-config",
      "app/config/exceptions-ng-config",
      "app/config/routes-ng-config",
      "app/config/ui-state-security-ng-config",
      "app/config/ui-router-ng-config",
      "app/config/md-toast-ng-config",
      "app/config/logging-ng-config",
      "github:angular/bower-angular@1.3.12",
      "github:angular-ui/ui-router@0.2.13",
      "github:angular/bower-angular-cookies@1.3.10",
      "github:angular/bower-angular-animate@1.3.12",
      "npm:process@0.10.0",
      "github:angular/bower-angular-aria@1.3.12",
      "github:ng-next/nn-ng-utils@0.1.2/index",
      "app/cross-cutting/toast-service/toast-service",
      "app/cross-cutting/exception/index",
      "app/layout/root-state/nn-menu/nn-menu",
      "app/layout/root-state/nn-menu-toolbar/nn-menu-toolbar",
      "app/layout/root-state/nn-menu-content/nn-menu-content",
      "app/layout/root-state/nn-main/nn-main",
      "app/layout/root-state/nn-main-content/nn-main-content",
      "app/layout/root-state/nn-main-toolbar/nn-main-toolbar",
      "app/layout/nn-rootstate/nn-rootstate",
      "app/layout/nn-spinner/nn-spinner",
      "app/authentication/ui/authentication-state/authentication-state",
      "app/authentication/ui/authentication-login-state/authentication-login-state",
      "app/ngnext/ui/ngnext-welcome-state/ngnext-welcome-state",
      "app/randomuser/ui/randomuser-state/randomuser-state",
      "app/randomuser/ui/randomuser-list-state/randomuser-list-state",
      "app/formsdemo/ui/formsdemo-state/formsdemo-state",
      "npm:lodash@2.4.1",
      "app/formsdemo/nn-formsdemo-widget/nn-formsdemo-widget",
      "app/reddit/ui/reddit-state/reddit-state",
      "npm:ms@0.6.2",
      "app/config/index",
      "github:jspm/nodelibs-process@0.1.0/index",
      "github:ng-next/nn-ng-utils@0.1.2",
      "app/cross-cutting/toast-service/index",
      "app/layout/root-state/root-state",
      "app/authentication/ui/index",
      "app/ngnext/ui/index",
      "app/randomuser/ui/index",
      "app/formsdemo/ui/index",
      "app/formsdemo/services/formsdemo-service",
      "npm:debug@2.1.1/debug",
      "github:jspm/nodelibs-process@0.1.0",
      "github:angular/bower-material@0.7.1/angular-material",
      "app/cross-cutting/index",
      "app/layout/index",
      "app/authentication/index",
      "app/ngnext/index",
      "app/randomuser/index",
      "app/formsdemo/services/index",
      "npm:debug@2.1.1/browser",
      "npm:angular-messages@1.3.36/angular-messages",
      "github:angular/bower-material@0.7.1",
      "app/formsdemo/index",
      "npm:debug@2.1.1",
      "npm:angular-messages@1.3.36",
      "npm:jsonp@0.1.0/index",
      "npm:jsonp@0.1.0",
      "app/reddit/ui/reddit-perfectloops-state/reddit-perfectloops-state-controller",
      "app/reddit/ui/reddit-perfectloops-state/reddit-perfectloops-state",
      "app/reddit/ui/index",
      "app/reddit/index",
      "main"
    ]
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.12",
    "angular-animate": "github:angular/bower-angular-animate@1.3.12",
    "angular-aria": "github:angular/bower-angular-aria@1.3.12",
    "angular-cookies": "github:angular/bower-angular-cookies@1.3.10",
    "angular-material": "github:angular/bower-material@0.7.1",
    "angular-messages": "npm:angular-messages@1.3.36",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.10",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "css": "github:systemjs/plugin-css@0.1.0",
    "jsonp": "npm:jsonp@0.1.0",
    "lodash": "npm:lodash@2.4.1",
    "nn-ng-utils": "github:ng-next/nn-ng-utils@0.1.2",
    "test-doubles-angular": "./test-doubles/angular/index",
    "test-doubles-formsdemo-service": "./app/formsdemo/services/test-doubles/index",
    "test-doubles-log-service": "./app/cross-cutting/log-service/test-doubles/index",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-animate@1.3.12": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-aria@1.3.12": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-cookies@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-angular-mocks@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular/bower-material@0.7.1": {
      "angular": "github:angular/bower-angular@1.3.12",
      "angular-animate": "github:angular/bower-angular-animate@1.3.12",
      "angular-aria": "github:angular/bower-angular-aria@1.3.12",
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

