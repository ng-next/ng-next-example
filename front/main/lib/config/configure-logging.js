//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.config( configureLogging );
};

/* @ngInject */
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
