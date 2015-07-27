//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.detailnew';

import { registerUiState } from 'nn-ng-utils';

//import controller from './movie-detailnew-state-controller';
import template from './movie-detailnew-state.html!text';

const config = {
  abstract : false,
  url      : '^/movies/new',
  template : template,
  //controller   : controller,
  //controllerAs : 'MovieNew',
  data     : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
