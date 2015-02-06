//noinspection BadExpressionStatementJS
'format es6';

let name = 'root';

import { registerUiState } from 'nn-ng-utils';

import './nn-menu/nn-menu';
import './nn-menu-toolbar/nn-menu-toolbar';
import './nn-menu-content/nn-menu-content';
import './nn-main/nn-main';
import './nn-main-content/nn-main-content';
import './nn-main-toolbar/nn-main-toolbar';

import template from './root-state.html!text';

var config = {
  abstract : true,
  template : template,
  data     : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );
