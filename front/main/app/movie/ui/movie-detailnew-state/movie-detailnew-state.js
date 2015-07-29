//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.detailnew';

import { registerUiState } from 'nn-ng-utils';
import controller from '../movie-detail-state/movie-detail-state-controller';
import template from '../movie-detail-state/movie-detail-state.html!text';
import createNewMovie from './create-new-movie';

const config = {
  abstract     : false,
  url          : '^/new-movie',
  template     : template,
  controller   : controller,
  controllerAs : 'movieCtrl',
  data         : {
    authenticationRequired : false
  },
  resolve      : {
    movie : createNewMovie
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
