//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureLogging ( $logProvider, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  toggleDebugging(); // no info or warn

  function toggleDebugging () {
    if ( $logProvider.debugEnabled ) {
      $logProvider.debugEnabled( cnst.isDev );
    }
  }
}

nnNgConfigurations.registerForConfigPhase( configureLogging );
