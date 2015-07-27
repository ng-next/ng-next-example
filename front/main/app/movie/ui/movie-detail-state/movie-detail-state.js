//noinspection BadExpressionStatementJS
'format es6';

const name =  'root.movie.detail';

import { registerUiState } from 'nn-ng-utils';

import controller from './movie-detail-state-controller';
import template from './movie-detail-state.html!text';

const config = {
  abstract     : false,
  url          : '^/movies/{id}',
  template     : template,
  controller   : controller,
  controllerAs : 'movieNew',
  data         : {
    authenticationRequired : false
  },
  resolve      : {
    movie : ( movieService, $stateParams ) => {
      //noinspection BadExpressionStatementJS
      'ngInject';

      return movieService.getOne( $stateParams.id )
        .then( movie => {
          return movie;
        });
    }
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
