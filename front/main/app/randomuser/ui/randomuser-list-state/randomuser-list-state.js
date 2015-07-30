//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.randomuser.list';

import { registerUiState } from 'nn-ng-utils';

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

registerUiState( name, config );
