//noinspection BadExpressionStatementJS
'format es6';

let stateName = 'root.ngnext';

export default __moduleName;

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import controller from './ngnext-welcome-state-controller';
import template from './ngnext-welcome-state.html!text';

let config = {
  abstract     : false,
  url          : '^/welcome',
  template     : template,
  controller   : controller,
  controllerAs : 'ngnextWelcomeCtrl',
  data         : {
    authenticationRequired : true
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
