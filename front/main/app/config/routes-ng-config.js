//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureRoutes ( $urlRouterProvider, $locationProvider ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  $locationProvider.html5Mode( false );

  $urlRouterProvider.when( '/X', '/Y' )
    .otherwise( '/welcome' );

  //maybe in the future pick up default ui-state configs from Story Groups
  // or override their defaults here
}

nnNgConfigurations.registerForConfigPhase( configureRoutes );
