//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.run( configureUiRouter );
};

/* @ngInject */
function configureUiRouter ( $rootScope, $state, $stateParams, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  exposeStateOnRootScope();
  handleStateChangeErrors();

  function exposeStateOnRootScope () {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

  function handleStateChangeErrors () {
    $rootScope.$on( cnst.events.stateChangeError,
      ( event, toState, toParams, fromState, fromParams, error ) => {
        // ToDo: use log service
        console.error( 'Error: ($stateChangeError) ', error, event, toState,
        toParams, fromState, fromParams );
      } );
  }
}
