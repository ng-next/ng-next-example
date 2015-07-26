//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.list';

import { registerUiState } from 'nn-ng-utils';

import controller from './movie-list-state-controller';
import template from './movie-list-state.html!text';

const config = {
  abstract     : false,
  url          : '^/movies',
  template     : template,
  controller   : controller,
  controllerAs : 'movieList',
  data         : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
