//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.run( configureSpinner );
};

/* @ngInject */
function configureSpinner ( $rootScope, cnst, spinnerService ) { //common
  //noinspection BadExpressionStatementJS
  'ngInject';

  spinnerService.isSpinnerVisible = true;

  $rootScope.$on( cnst.events.stateChangeSuccess, () => {
    spinnerService.stop();
  });

  $rootScope.$on( cnst.events.stateChangeStart, () => {
    spinnerService.start();
  });

  $rootScope.$on( cnst.events.stateChangeError, () => {
    spinnerService.stop();
  });
}
