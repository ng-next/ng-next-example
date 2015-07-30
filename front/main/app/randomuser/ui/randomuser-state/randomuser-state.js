//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.randomuser';

import { registerUiState } from 'nn-ng-utils';

import template from './randomuser-state.html!text';

let config = {
  abstract : true,
  template : template,
  data     : {
    authenticationRequired : false
  }
};

registerUiState( name, config );
