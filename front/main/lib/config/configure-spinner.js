//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.run( configureSpinner );
};

/* @ngInject */
function configureSpinner ( $rootScope, spinnerService ) { //common
  //noinspection BadExpressionStatementJS
  'ngInject';
  spinnerService.isSpinnerVisible = true;

  $rootScope.$on( '$stateChangeSuccess', () => {
    spinnerService.stop();
  });

  $rootScope.$on( '$stateChangeStart', () => {
    spinnerService.start();
  });

  $rootScope.$on( '$stateChangeError', () => {
    spinnerService.stop();
  });
}
