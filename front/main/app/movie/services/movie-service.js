//noinspection BadExpressionStatementJS
'format es6';

let name = 'movieService';

import { registerService } from 'nn-ng-utils';

class MovieService {
  constructor () {
    //noinspection BadExpressionStatementJS
    'ngInject';
  }
}

registerService( name, __moduleName, MovieService );

export default MovieService;
