//noinspection BadExpressionStatementJS
'format es6';

let name = 'root.ngnext';

import { registerUiState } from 'nn-ng-utils';

import controller from './ngnext-welcome-state-controller';
import template from './ngnext-welcome-state.html!text';

let config = {
  abstract     : false,
  url          : '^/welcome',
  template     : template,
  controller   : controller,
  controllerAs : 'ngnextWelcomeState',
  data         : {
    authenticationRequired : true
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
