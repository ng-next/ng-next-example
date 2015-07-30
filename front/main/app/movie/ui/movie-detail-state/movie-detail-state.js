//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.detail';

import { registerUiState } from 'nn-ng-utils';

import controller from './movie-detail-state-controller';
import template from './movie-detail-state.html!text';
import resolveMovie from './get-movie';

const config = {
  abstract     : false,
  url          : '^/movies/{id}',
  template     : template,
  controller   : controller,
  controllerAs : 'movieCtrl',
  data         : {
    authenticationRequired : false
  },
  resolve      : {
    movie : resolveMovie
  }
};

registerUiState( name, config );
