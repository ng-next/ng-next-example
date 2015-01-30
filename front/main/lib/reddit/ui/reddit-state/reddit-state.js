//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.reddit';

import { registerUiState } from 'nn-ng-utils';

import template from './reddit-state.html!text';

let config = {
  abstract     : true,
  template     : template,
  controllerAs : 'reddit-state',
  data         : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
