//noinspection BadExpressionStatementJS
'format es6';

export default function loggingExceptionHandler (
  $injector,
  $delegate,
  exceptionConfig
) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  let appErrorPrefix = exceptionConfig.appErrorPrefix || '';
  //let log;

  return function ( exception, cause ) {
    $delegate( exception, cause );

    //var errorData = {
    //  exception : exception,
    //  cause     : cause
    //};

    //var msg = appErrorPrefix + exception.message;
    /**
     * Could add the error to a service's collection,
     * add errors to $rootScope, log errors to remote web server,
     * or log locally. Or throw hard. It is entirely up to you.
     * throw exception;
     *
     * @example
     *     throw { message: 'error message we added' };
     *
     */
    // TODO: find other solution vor circular reference to $rootScope
    // $rootScope events is no alternative ;)
    //if ( !log ) {
    //  log = $injector.get( 'log', 'loggingExceptionHandler' );
    //}
    //
    //log.error( msg, errorData );
  };
};
