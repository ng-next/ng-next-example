//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.randomuserlist';

import { registerUiState } from 'nn-ng-helper';

import controller from './randomuser-list-state-controller';
import template from './randomuser-list-state.html!text';

let config = {
  abstract     : false,
  url          : '^/randomusers',
  template     : template,
  controller   : controller,
  controllerAs : 'randomuserState',
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

registerUiState( name, config, __moduleName );

export default __moduleName;
