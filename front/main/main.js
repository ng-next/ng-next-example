//noinspection BadExpressionStatementJS
'format es6';

let APP_NAME = 'app';

export default {};

import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angular-animate';
import 'angular-messages';
import 'angular-aria';
import 'angular-material';
import 'angular-material/angular-material.css!css';
import 'bootstrap';
import 'vitalets/angular-xeditable';
import 'vitalets/angular-xeditable/css/xeditable.css!css';
import { nnNgModules as angularModuleNameContainer } from 'nn-ng-utils';
registerAngularCoreModules();

// import custom app modules
import 'app/cross-cutting/index';
import 'app/layout/index';
import 'app/authentication/index';
import 'app/ngnext/index';
import 'app/randomuser/index';
import 'app/formsdemo/index';
import 'app/reddit/index';
import 'app.css!css';
import configureAngular from 'app/config/index';

configureAngular( getInitializedAppModule() );
bootstrap();

function registerAngularCoreModules () {
  angularModuleNameContainer.registerCore( [ 'ui.router', 'ngCookies',
    'ngAnimate', 'ngMaterial', 'ngMessages', 'ngAria', 'xeditable'
  ] );
}

function getInitializedAppModule () {
  return angular.module( APP_NAME, angularModuleNameContainer.getAll() );
}

function bootstrap () {
  angular.element( document ).ready(
    () => angular.bootstrap( document, [ APP_NAME ], { strictDi : false })
  );
}
