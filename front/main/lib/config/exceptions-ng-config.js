//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

import loggingExceptionHandler from
  'app/cross-cutting/exception/logging-exception-handler';

function configureExceptions ( $provide, exceptionConfigProvider, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  exceptionConfigProvider.setAppErrorPrefix( cnst.appErrorPrefix );
  // TODO: automatically deactive in production (during build step)!
  $provide.decorator( '$exceptionHandler', loggingExceptionHandler );
}

nnNgConfigurations.registerForConfigPhase( configureExceptions );
