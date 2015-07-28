//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.list';

import { registerUiState } from 'nn-ng-utils';

import controller from './movie-list-state-controller';
import template from './movie-list-state.html!text';
import resolveMovies from './get-all-movies';

const config = {
  abstract     : false,
  url          : '^/movies',
  template     : template,
  controller   : controller,
  controllerAs : 'movieList',
  data         : {
    authenticationRequired : false
  },
  resolve      : {
    movies : resolveMovies
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
