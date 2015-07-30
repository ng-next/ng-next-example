//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureJsDataMovieResource ( DS ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  DS.defineResource( 'movie' );
}

nnNgConfigurations.registerForRunPhase( configureJsDataMovieResource );
