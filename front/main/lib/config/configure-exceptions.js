//noinspection BadExpressionStatementJS
'format es6';

import loggingExceptionHandler from
  'app/cross-cutting/exception/logging-exception-handler';

export default ( app ) => {
  app.config( configureExceptions );
};

/* @ngInject */
function configureExceptions ( $provide, exceptionConfigProvider, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  exceptionConfigProvider.setAppErrorPrefix( cnst.appErrorPrefix );
  // TODO: automatically deactive in production (during build step)!
  $provide.decorator( '$exceptionHandler', loggingExceptionHandler );
}
