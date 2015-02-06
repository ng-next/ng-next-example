//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureSpinner ( $rootScope, spinnerService ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  spinnerService.isSpinnerVisible = true;

  $rootScope.$on( '$stateChangeSuccess', () => {
    spinnerService.stop();
  });

  $rootScope.$on( '$stateChangeStart', () => {
    spinnerService.start();
  });

  $rootScope.$on( '$stateChangeError', () => {
    spinnerService.stop();
  });
}

nnNgConfigurations.registerForRunPhase( configureSpinner );
