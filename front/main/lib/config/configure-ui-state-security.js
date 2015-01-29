//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.run( configureUiStateSecurity );
};

function configureUiStateSecurity ( $rootScope, $state, authService ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  $rootScope.$on( '$stateChangeStart', ( event, toState ) => {
    if ( unknownUserGoesToPrivateState() ) {
      goTo( 'root.user.login' );
    }

    if ( loggedInUserGoesToStateForUnknownUser() ) {
      goTo( '??????????????????' );
    }

    function unknownUserGoesToPrivateState () {
      return toState.data.requiresAuthentication &&
        Boolean( authService.userIsNotLoggedIn() );
    }

    function loggedInUserGoesToStateForUnknownUser () {
      return authService.userIsLoggedIn() && toStateIsOnlyForUnknownUser();

      function toStateIsOnlyForUnknownUser () {
        return toState.name === 'root.user.login' ||
               toState.name === 'root.user.signup' ||
               toState.name === 'root.user.signuptoken';
      }
    }

    function goTo ( targetState ) {
      $state.transitionTo( targetState );
      event.preventDefault();
    }
  });
}