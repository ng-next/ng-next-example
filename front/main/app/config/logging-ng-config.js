//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureLogging ( $logProvider, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  toggleDebugging(); // no info or warn

  function toggleDebugging () {
    if ( $logProvider.debugEnabled ) {
      console.log( 'angular debug mode is: ' + cnst.isDev );
      $logProvider.debugEnabled( cnst.isDev );
    } else {
      console.log( '$logProvider.debugEnabled is not truthy!' );
    }
  }
}

nnNgConfigurations.registerForConfigPhase( configureLogging );
