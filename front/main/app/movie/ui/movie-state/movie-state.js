//noinspection BadExpressionStatementJS
'format es6';

const name = 'root.movie';

import { registerUiState } from 'nn-ng-utils';
import template from './movie-state.html!text';

const config = {
  abstract : true,
  template : template,
  data     : {
    authenticationRequired : false
  }
};

registerUiState( name, config );
