//noinspection BadExpressionStatementJS
'format es6';

let stateName =  'root.formsdemo';

export default __moduleName;

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import controller from './formsdemo-state-controller';
import template from './formsdemo-state.html!text';

let config = {
  abstract     : false,
  url          : '^/formsdemo',
  template     : template,
  controller   : controller,
  controllerAs : 'formsdemo',
  data         : {
    authenticationRequired : true
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
