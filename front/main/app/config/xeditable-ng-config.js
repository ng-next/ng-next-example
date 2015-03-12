//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureXeditable ( editableOptions ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  editableOptions.theme = 'bs3';
}

nnNgConfigurations.registerForRunPhase( configureXeditable );
