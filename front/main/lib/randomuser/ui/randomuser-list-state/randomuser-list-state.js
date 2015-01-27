//noinspection BadExpressionStatementJS
'format es6';

let stateName =  'root.randomuserlist';

export default __moduleName;

// TODO: make alias
import UiRouterState from 'app/core/angular/ui-router-state';

import controller from './randomuser-list-state-controller';
import template from './randomuser-list-state.html!text';

let config = {
  abstract     : false,
  url          : '^/randomusers',
  template     : template,
  controller   : controller,
  controllerAs : 'vm',
  data         : {
    authenticationRequired : true
  },
  resolve      : {
    users : ( randomuserGateway ) => {
      //noinspection BadExpressionStatementJS
      'ngInject';

      return randomuserGateway.getUsers();
    }
  }
};

new UiRouterState( stateName, config ).registerAs( __moduleName );
