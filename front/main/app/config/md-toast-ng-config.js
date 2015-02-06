//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureMdToast ( mdToastConfigProvider ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  mdToastConfigProvider.setHideDelay( 1500 );
  mdToastConfigProvider.setPosition( 'bottom right' );
  mdToastConfigProvider.setParentElementName ( 'footer' );
}

nnNgConfigurations.registerForConfigPhase( configureMdToast );
