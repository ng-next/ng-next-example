//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.run( configureUiRouter );
};

/* @ngInject */
function configureUiRouter ( $rootScope, $state, $stateParams ) {
  //noinspection BadExpressionStatementJS
  'ngInject';
  exposeStateOnRootScope();
  handleStateChangeErrors();

  function exposeStateOnRootScope () {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  function handleStateChangeErrors () {
    $rootScope.$on( '$stateChangeError',
      ( event, toState, toParams, fromState, fromParams, error ) => {
        console.error( 'Error: ($stateChangeError) ', error, event, toState,
        toParams, fromState, fromParams );
      } );
  }
}
