//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.formsdemo';

import { registerUiState } from 'nn-ng-utils';

import controller from './formsdemo-state-controller';
import template from './formsdemo-state.html!text';

let config = {
  abstract     : false,
  url          : '^/formsdemo',
  template     : template,
  controller   : controller,
  controllerAs : 'formsdemoState',
  data         : {
    authenticationRequired : true
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
