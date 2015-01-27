//noinspection BadExpressionStatementJS
'format es6';

let stateName =  'root.authentication';

export default __moduleName;

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import template from './authentication-state.html!text';

let config = {
  abstract : true,
  template : template,
  data     : {
    authenticationRequired : false
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
