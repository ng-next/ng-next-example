//noinspection BadExpressionStatementJS
'format es6';

let stateName =  'root.authentication.login';

export default __moduleName;

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import controller from './authentication-login-state-controller';
import template from './authentication-login-state.html!text';

let config = {
  abstract     : false,
  url          : '^/login',
  template     : template,
  controller   : controller,
  controllerAs : 'login',
  data         : {
    authenticationRequired : false
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
