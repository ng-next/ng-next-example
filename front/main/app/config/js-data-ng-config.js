//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';
import DSLocalForageAdapter from 'js-data-localforage';

//function configureJsData ( DS, DSLocalForageAdapter ) {
function configureJsData ( DS ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  DS.registerAdapter( 'localforage', new DSLocalForageAdapter(),
    { default : true });
}

nnNgConfigurations.registerForRunPhase( configureJsData );
