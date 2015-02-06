//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.authentication.login';

import { registerUiState } from 'nn-ng-utils';

import controller from './authentication-login-state-controller';
import template from './authentication-login-state.html!text';

let config = {
  abstract     : false,
  url          : '^/login',
  template     : template,
  controller   : controller,
  controllerAs : 'authenticationLoginState',
  data         : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
