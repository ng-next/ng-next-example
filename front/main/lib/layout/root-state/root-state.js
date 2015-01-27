//noinspection BadExpressionStatementJS
'format es6';

let stateName = 'root';

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import 'app/layout/spinner/spinner';

import './nn-menu/nn-menu';
import './nn-menu-toolbar/nn-menu-toolbar';
import './nn-menu-content/nn-menu-content';
import './nn-main/nn-main';
import './nn-main-content/nn-main-content';
import './nn-main-toolbar/nn-main-toolbar';

import controller from './root-state-controller';
import template from './root-state.html!text';

var config = {
  abstract     : true,
  template     : template,
  controller   : controller,
  controllerAs : 'vm',
  data         : {
    authenticationRequired : false
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
